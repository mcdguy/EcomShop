const express = require('express');
const router = express.Router();
const razorpay = require('razorpay');
const Product = require('../models/product');

const instance = new razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})

router.post('/makepayment',(req,res)=>{
    const cartProducts = req.body.cartProducts;
    if(!cartProducts){
        res.json({error:'no products found'});
        return;
    }
    productIds = cartProducts.map(item=>{return item._id});
    let amount = 0;
    const receipt = 'receipt#123';
    const notes = {desc: 'making payment to baksh'};
    const currency = 'INR';
    //now i want to find all cart documents at once
    Product.find({'_id' : {$in: productIds} })
        .then(result=>{
            result.forEach(item=>{
                //nested loops because i want the purchase qty after finding items
                cartProducts.forEach(cartItem=>{
                    if(item._id == cartItem._id){
                        amount += item.price*cartItem.pqty;
                    }
                })
            })
            console.log('amount',amount);
            instance.orders.create({amount,currency,receipt,notes},(error,order)=>{
                if(error){
                    res.json(error);
                    return;
                }
                return res.json(order);
            });

        })
        .catch(err => console.log(err));
})

module.exports = router;