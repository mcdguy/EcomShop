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

router.post('/makepayment',(req,res)=>{
    // console.log(req.body)
    const {cartProducts,billingAddress,shippingAddress,user,showShipping} = req.body;
    //this can be manipulated like someone can send an id of cheap item and name and product id of expensive item and since price
    //is calculated using id he can successfully cheat us
    // so where i am calculating the cart total, i should create this orderItems there only i should trust id and pqty only and fetch productId, price and name from backend i dont need to do anything just create this variable and fill it in the nested loop 
    let orderItems = cartProducts.map(item => {
        return(
            {
                itemId:item._id,
                productId: item.productId,
                name: item.name,
                price: item.price,//this price is the purchase price
                pqty: item.pqty
            }
        );//this map method reduces the item to required properties only
    })
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
        orderItems,
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
    // console.log(newOrder);
    let orderError = handleOrderError(newOrder);
    // console.log('order error',orderError);
    //if there is a validation error code must return
    if(orderError !== ''){
        res.status(422).json({error:'details not provided'});
        return;
    }
    if(!cartProducts){
        res.status(404).json({error:'no products found'});
        return;
    }
    productIds = cartProducts.map(item=>{return item._id});
    let amount = 0;
    let receipt = uuid.v4();
    //now i want to find all cart documents at once
    Product.find({'_id' : {$in: productIds} })
        .then(result=>{
            result.forEach(item=>{
                //nested loops because i want the purchase qty after finding items and the order in which items come back is not same
                cartProducts.forEach(cartItem=>{
                    if(item._id == cartItem._id){
                        amount += item.price*cartItem.pqty;
                    }
                })
            })
            // console.log('amount',amount);
            instance.orders.create({amount,currency: 'INR',receipt,payment_capture:1},(error,order)=>{
                if(error){
                    res.status(500).json(error);
                    return;
                }
                // console.log(order)
                newOrder.amount = order.amount;
                newOrder.receipt = order.receipt;
                newOrder.orderId = order.id;
                // console.log(newOrder);
                // console.log(order);
                // return res.json(order);

                Order.create(newOrder)
                    .then(result =>{
                        res.json(order);
                            return;
                    })
                    .catch(err =>{
                        return res.status(500).json({error: 'could not save order'});
                    })
            });
        })
        .catch(err => console.log(err));
})

router.delete('/deleteorder',(req,res)=>{
    console.log(req.body)
    const {order_id} = req.body;
    if(!order_id){
        res.status(400).json({error: 'could not find order'});
        return;
        console.log(order_id);
    }
    Order.findOneAndDelete({orderId:order_id})
        .then(res => {
            console.log('deleted');
            res.json({success: 'order deleted successfully'});
            return;
        })
        .catch(err =>{
            res.status(400).json({error: 'could not delete order'});
            return;
        })
});

router.post('/verify',(req,res)=>{
    const {order_id,payment_id,payment_sign} = req.body;

    const digest = crypto
        .createHmac("sha256", process.env.KEY_SECRET)
        .update(`${order_id}|${payment_id}`)
        .digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== payment_sign){
        Order.findOneAndDelete({orderId:order_id})
        .then(res => {
            // console.log('deleted');
            return res.status(400).json({ msg: "Transaction not legit!" });
            // res.json({success: 'order deleted successfully'});
            // return;
        })
        .catch(err =>{
            return res.status(400).json({error: 'could not delete order'});
        })
    }
    
    Order.findOneAndUpdate({orderId:order_id},{pending:false},{new:true})
    .then((result)=>{
        return res.json({success:'singature matched, updated record'});
    })
    .catch((err)=>{res.json({error: err})});
})
module.exports = router;