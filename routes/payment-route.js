const express = require('express');
const router = express.Router();
const razorpay = require('razorpay');
const Product = require('../models/product');
const uuid = require('uuid');
const {handleOrderError} = require('../utils/handleOrderError');
const Order = require('../models/order');
const crypto = require('crypto');
const instance = new razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})


const deleteOrder = (order_id) =>{//this function returns a promise
    let stockUpdate = [];
    return new Promise((resolve,reject)=>{
        Order.findOne({orderId:order_id})
            .then(result => {
                productIds = result.orderItems.map(item=>{return item.itemId});
                Product.find({'_id' : {$in: productIds} })//now i have the order and all the item that are in order items
                    .then(productItems =>{
                        //here i need to create new array for stock
                        productItems.forEach(item=>{
                            result.orderItems.forEach(orderItem=>{
                                if(item._id == orderItem.itemId){//this also means i  have found the product in db
                                    const newStock = {
                                        id: item._id,
                                        stock: item.stock + orderItem.pqty
                                    }
                                    stockUpdate.push(newStock);
                                    //i can right away create a promise here
                                }
                            })
                        })
    
                        let stockUpdatePromise = [];
                        stockUpdate.forEach(item=>{
                            let newPromise = new Promise((resolve,reject)=>{
                                Product.findByIdAndUpdate(item.id,{stock:item.stock})
                                    .then((result)=>{
                                        resolve(result);
                                    })
                                    .catch((err)=>{
                                        reject(err);
                                    })
                            })
                            stockUpdatePromise.push(newPromise);
                        })    
                        console.log(stockUpdate);
                        return Promise.all(stockUpdatePromise)
                });
            })
            .then((result)=>{//this is result from Promise.all
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

//can this be a cron job?
// timeout to clean up pending orders
setInterval(()=>{
    let tenMinutesOld = new Date();
    tenMinutesOld.setMinutes(tenMinutesOld.getMinutes()-10)
    Order.find({validity:{$lt:tenMinutesOld}})
        .then((result)=>{
            result.forEach(item=>{
                deleteOrder(item.orderId)
                    .then(result =>{
                        // do nothing
                        console.log('item removed');
                    })
                    .catch(err =>{
                        console.log('failed to remove item');
                    })
            })
            console.log('removed old items')
        })
        .catch(err => {console.log('failed')});
},120000);//runs after 2 mins



router.post('/makepayment',(req,res)=>{
    // console.log(req.body)
    const {cartProducts,billingAddress,shippingAddress,user,showShipping} = req.body;
    //this can be manipulated like someone can send an id of cheap item and name and product id of expensive item and since price is calculated using id he can successfully cheat us
    let orderItems = [];
    let mismatch = false; //this variable will trigger cart refresh if product is out of stock or deleted
    let stockUpdate = [];
    let amount = 0;
    let receipt = uuid.v4();

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
    //this means shipping and billing address are different and i will add billing address
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
    //now i want to find all cart documents at once
    Product.find({'_id' : {$in: productIds} })
        .then(result=>{
            result.forEach(item=>{
                //nested loops because i want the purchase qty after finding items and the order in which items come back is not same
                cartProducts.forEach(cartItem=>{
                    if(item._id == cartItem._id){//this also means i  have found the product in db
                        amount += item.price*cartItem.pqty;
                        let newStockQty = item.stock - cartItem.pqty;
                        if(newStockQty < 0){
                            mismatch = true;
                        }
                        const newStock = {//this is the new stock of this item id
                            id: item._id,
                            stock: newStockQty
                        }
                        const singleOrderItem = {
                            itemId:item._id,
                            productId: item.productId,
                            name: item.name,
                            price: item.price,//this price is the purchase price
                            pqty: cartItem.pqty
                        }
                        stockUpdate.push(newStock);
                        orderItems.push(singleOrderItem);
                    }
                })
            })
            console.log(stockUpdate);
            if(mismatch){// i am calling out of stock as mismatch because that will only happen if cart is not in sync with backend
                return res.json({mismatch: 'need to update cart'});
            }

            //creating array of promise
            let stockUpdatePromise = [];
            stockUpdate.forEach(item=>{
                let newPromise = new Promise((resolve,reject)=>{
                    Product.findByIdAndUpdate(item.id,{stock:item.stock})
                        .then((result)=>{
                            resolve(result);
                        })
                        .catch((err)=>{
                            reject(err);
                        })
                })
                stockUpdatePromise.push(newPromise);
            })

            //updating backend
            instance.orders.create({amount,currency: 'INR',receipt,payment_capture:1},(error,order)=>{
                if(error) return res.status(500).json(error);
                newOrder.orderItems = orderItems;
                newOrder.amount = order.amount;
                newOrder.receipt = order.receipt;
                newOrder.orderId = order.id;
                Order.create(newOrder)
                    .then(() =>{
                        return Promise.all(stockUpdatePromise);//only after order is created i will save it to backend and then send the order
                    })
                    .then(()=>{
                        return res.json(order);
                    })
            });
            
            // Promise.all(stockUpdatePromise)
            //     .then(result=>{
            //         instance.orders.create({amount,currency: 'INR',receipt,payment_capture:1},(error,order)=>{
            //             if(error) return res.status(500).json(error);

            //             newOrder.orderItems = orderItems;
            //             newOrder.amount = order.amount;
            //             newOrder.receipt = order.receipt;
            //             newOrder.orderId = order.id;
            //             Order.create(newOrder)
            //                 .then(result =>{
            //                     res.json(order);
            //                         return;
            //                 })
            //                 .catch(err =>{
            //                     return res.status(500).json({error: 'could not save order'});
            //                 })
            //         });
            //     })
            })
            .catch(err =>{
                return res.status(500).json({error: 'an error occurred'});
            })
})

router.post('/webhook',(req,res)=>{
    res.json({status: 'ok'});
    console.log(req.body);
    console.log('webhook running');
})
//deleting order
router.delete('/deleteorder',(req,res)=>{
    const {order_id} = req.body;

    if(!order_id) return res.status(400).json({error: 'could not find order'});
    
    deleteOrder(order_id)
        .then(res => {
            if(res === 'order deleted'){
                return res.json({success: 'order deleted successfully'});
            }
            else{
                return res.json({success: 'could not delete order'});
            }
        })
        .catch(err => {
            return res.json({success: 'could not delete order'});
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
                return res.json({success: 'could not delete order'});
            }
        })
        .catch(err => {
            return res.json({success: 'could not delete order'});
        });
    }
    
    Order.findOneAndUpdate({orderId:order_id},{pending:false,paymentId:payment_id,$unset: {validity: 1}},{new:true})//deleting the validity key
    .then((result)=>{
        return res.json({success:'singature matched, updated record'});
    })
    .catch((err)=>{res.json({error: err})});
})
module.exports = router;