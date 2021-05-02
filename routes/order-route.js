const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/',(req,res)=>{
    let {page,limit} = req.query;
    if(!page){
        page = 1;
    }
    if(!limit){
        limit = 1;
    }
    limit = parseInt(limit);
    skip = (page - 1) * limit;
    Order.find().skip(skip).limit(limit)
        .then(result=>{
                res.json({orders: result, page,limit})
        })
        .catch(err => {
            console.log(err)
            res.json({error: 'could not fetch orders'})});
})

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Order.findById(id)
        .then(result =>{
            if(!result){
                return res.json({error: 'order not found'})
            }
            res.json({order: result});
        })
        .catch(err => {
            res.json({error: 'an error occured'});
        })
})
module.exports = router;