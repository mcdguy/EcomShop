//https://www.youtube.com/watch?v=DK304_E9mVo
const express = require('express');
const router = express.Router();
const razorpay = require('razorpay');
const Product = require('../models/product');
const uuid = require('uuid');
const {handleOrderError} = require('../utils/handleOrderError');
const Order = require('../models/order');
const {checkUser} = require('../utils/userDetails');
const User = require('../models/user');
const {orderEmail,transporter} = require('../utils/nodemailer');
const Coupon = require('../models/coupon');
const crypto = require('crypto');
const logger = require('../utils/logger');

const instance = new razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})


//this function returns a promise
const deleteOrder = (order_id) =>{
    return new Promise((resolve,reject)=>{
        Order.findOne({orderId:order_id})
            .then(result => {
                    let stockUpdatePromise = [];
                    result.orderItems.forEach(item =>{
                        let newPromise = new Promise((resolve,reject)=>{
                            Product.findByIdAndUpdate(item.itemId,{$inc:{'stock': item.pqty}},{new:true})
                                .then((result)=>{
                                    resolve(result);
                                })
                                .catch((err)=>{
                                    reject(err);
                                })
                        })
                        stockUpdatePromise.push(newPromise);
                    })
                    return Promise.all(stockUpdatePromise)
            })
            .then((result)=>{//this is result from Promise.all
                result.forEach(item=>{
                    console.log(item.stock);   
                })
                return Order.findOneAndDelete({orderId:order_id});
            })
            .then(deletedOrder =>{
                resolve('order deleted');
            })
            .catch(err =>{
                reject('could not delete order');
            })
    })
}


//interval - cleans pending orders after 10 mins
setInterval(()=>{
    let tenMinutesOld = new Date();
    tenMinutesOld.setMinutes(tenMinutesOld.getMinutes()-10)
    Order.find({validity:{$lt:tenMinutesOld}})
        .then((orders)=>{
            orders.forEach(item=>{
                deleteOrder(item.orderId)
                    .then(res =>{
                        logger.log('info',`removed pending orders`);
                    })
                    .catch(err =>{
                        logger.log('error',`could not delete pending orders`);
                    })
            })
        })
        .catch(err => {
            logger.log('error',`could not delete pending orders`);
        });
},120000);//runs after 2 mins




router.post('/makepayment',(req,res)=>{
    const {code,cartProducts,billingAddress,shippingAddress,user,showShipping,saveDetails} = req.body;
    const token = req.cookies.jwt;
    let orderItems = [];
    let mismatch = false; //this variable will trigger cart refresh if product is out of stock or deleted
    let amount = 0;
    let receipt = uuid.v4();
    let discount = 0;//this is in percent
    let discountAmount = 0;//this is in paise

    const newOrder ={
        buyer:{
            name:user.name,
            email:user.email,
            contact:billingAddress.billingcontact
        },
        billingAddress: {
            addressLine: billingAddress.billingaddressLine,
            state: billingAddress.billingstate,
            city: billingAddress.billingcity,
            pin: billingAddress.billingpin
        },
        pending: true,
        isAddressSame:!showShipping,
    }
    //this means shipping and billing address are different
    if(showShipping){
        newOrder.shippingAddress = {
            addressLine: shippingAddress.shippingaddressLine,
            state: shippingAddress.shippingstate,
            city: shippingAddress.shippingcity,
            pin: shippingAddress.shippingpin,
        }
    }
    let orderError = handleOrderError(newOrder);

    //if there is a validation error code must return
    if(orderError !== '') return res.status(422).json({error:'details not provided'});
    if(!cartProducts) return res.status(404).json({error:'no products found'});
    
    productIds = cartProducts.map(item=>{return item._id});

    Coupon.findOne({code})
    .then(coupon=>{
        if(!coupon){
            discount=0;
        }
        if(coupon){
            discount = coupon.discount;
            console.log("discount", coupon.discount)
        }
            //now find all cart documents at once
            Product.find({'_id' : {$in: productIds} })
                .then(result=>{
                    result.forEach(item=>{
                        //nested loops because i want the purchase qty after finding items and the order in which items come back is not same
                        cartProducts.forEach(cartItem=>{
                            if(item._id == cartItem._id){
                                amount += item.price*cartItem.pqty;
                                const singleOrderItem = {
                                    img: item.img[0],
                                    itemId:item._id,
                                    productId: item.productId,
                                    name: item.name,
                                    price: item.price,//this price is the purchase price
                                    pqty: cartItem.pqty
                                }
                                orderItems.push(singleOrderItem);
                            }
                        })
                    })
                    discountAmount = amount/100*discount;
                    newOrder.discount = discountAmount;
                    
                    //creating array of promise
                    let stockUpdatePromise = [];
                    cartProducts.forEach(item =>{
                        let newPromise = new Promise((resolve,reject)=>{
                            Product.findByIdAndUpdate(item._id,{$inc:{'stock': (-item.pqty)}},{new:true})
                                .then((updatedProduct)=>{
                                    resolve(updatedProduct);
                                })
                                .catch((err)=>{
                                    logger.log('error',`path: ${req.baseUrl}, ${err}`);
                                    reject(err);
                                })
                        })
                        stockUpdatePromise.push(newPromise);
                    })
                    
                    if(token){
                        const id = checkUser(token);
                        if(id){
                            newOrder.user = id;//inserting id in order
                            if(saveDetails){
                                let address = newOrder.billingAddress;
                                address.contact = billingAddress.billingcontact;
                                // console.log(address);
                                User.findByIdAndUpdate(id,{address})
                                    .then((result)=>{
                                        console.log('address updated');
                                    })
                            }
                        }
                    }

                    //updating db
                    instance.orders.create({amount:(amount-discountAmount),currency: 'INR',receipt,payment_capture:1},(error,order)=>{
                        if(error) return res.status(500).json(error);
                        newOrder.orderItems = orderItems;
                        newOrder.amount = order.amount;
                        newOrder.receipt = order.receipt;
                        newOrder.orderId = order.id;
                        newOrder.validity = new Date();
                        Promise.all(stockUpdatePromise)//updating stock after order creation
                            .then(updatedStock=>{
                                updatedStock.forEach(item=>{
                                    console.log(item.stock);
                                    if(item.stock < 0){
                                        mismatch = true;
                                    }
                                })
                                if(mismatch){
                                        let rollbackPromise = [];
                                        cartProducts.forEach(item =>{
                                            let rollPromise = new Promise((resolve,reject)=>{
                                                Product.findByIdAndUpdate(item._id,{$inc:{'stock': item.pqty}},{new:true})//quoting stock helps don't know why
                                                    .then((result)=>{
                                                        resolve(result);
                                                    })
                                                    .catch((err)=>{
                                                        logger.log('error',`path: ${req.baseUrl}, ${err}`);
                                                        reject(err);
                                                    })
                                            })
                                            rollbackPromise.push(rollPromise);
                                        })
                                        Promise.all(rollbackPromise)
                                            .then(() =>{
                                                return res.json({mismatch: 'need to update cart'});
                                            })
                                    }else{
                                        Order.create(newOrder)
                                            .then(()=>{
                                                return res.json(order);
                                            })
                                    }
                            })
                        });         
                    })
            })
            .catch(err =>{
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
                return res.status(500).json({error: 'an error occurred'});
            })
})

//webhook
router.post('/webhook',(req,res)=>{
    res.json({status: 'ok'});
    const digest = crypto
    .createHmac("sha256", process.env.WH_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

    if(digest === req.headers['x-razorpay-signature']){
        if(req.body.event === 'payment.authorized'){
            const order_id = req.body.payload.payment.entity.order_id;
            const payment_id = req.body.payload.payment.entity.id;
            console.log('webhook running');
            Order.findOne({orderId:order_id})
                .then(result =>{
                    //before updating i can check if order exists and if not it means timer deleted it and this is late authorization so i should issue refund                    
                    // if(!result){
                        //issue refund
                    //     return;
                    // }

                    //or send order confirmation mail here
                    Order.findOneAndUpdate({orderId:order_id},{pending:false,paymentId:payment_id,$unset: {validity: 1}},{new:true})
                    .then((result)=>{
                        console.log('updated');
                    })
                })
        }
    }
    else{
        //not legit request
    }
})

//deleting order
router.delete('/deleteorder',(req,res)=>{
    const {order_id} = req.body;

    if(!order_id) return res.status(400).json({error: 'could not find order'});
    
    deleteOrder(order_id)
        .then(result => {
            console.log(result);
            if(result == 'order deleted'){
                return res.json({success: 'order deleted successfully'});
            }
            else{
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
                return res.json({error: 'could not delete order'});
            }
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            return res.json({error: 'could not delete order'});
        });
});

//verifying order
router.post('/verify',(req,res)=>{
    const {order_id,payment_id,payment_sign} = req.body;

    const digest = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== payment_sign){
        deleteOrder(order_id)
        .then(res => {
            if(res === 'order deleted'){
                return res.json({success: 'order deleted successfully'});
            }
            else{
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
                return res.json({error: 'could not delete order'});
            }
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            return res.json({error: 'could not delete order'});
        });
    }
    //order verified
    //adding order to user's orders
    const token = req.cookies.jwt;
    if(token){
        const id = checkUser(token);
        if(id){
            Order.findOne({orderId: order_id})
                .then(result=>{
                    if(result){
                        User.findByIdAndUpdate(id,{$push:{"orders":{order:result.orderItems,amount:result.amount,orderId:result.orderId}}},{new:true})
                            .then(result=>{
                                console.log('orders added to user');
                            })
                    }
                })
        }
    }

    //instead of updating order here i can leave that on webhook and just send success so that order alert popup shows up 
    Order.findOneAndUpdate({orderId:order_id},{pending:false,paymentId:payment_id,$unset: {validity: 1}},{new:true})//deleting the validity key
    .then((result)=>{
        //here i am sending mail
       const mailOptions = {
            from: process.env.EMAIL,
            to: result.buyer.email,
            subject: 'order confirmation mail',
            text: orderEmail(result.buyer.name,result.orderId)
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                logger.log('error',`path: ${req.baseUrl}, email: ${result.buyer.email}, ${err}`);
            } else {
                logger.log('info',`path:${req.baseUrl}, email sent: ${info.response}`);
            }
        });

        //the mail portion ends here i can paste it in webhook instead
        return res.json({success:'singature matched, updated record'});
    })
    .catch((err)=>{
        logger.log('error',`path: ${req.baseUrl}, ${err}`);
        res.json({error: err})
    });
})
module.exports = router;