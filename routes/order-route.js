const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/',(req,res)=>{
    Order.find()
        .then(result=>{
            res.json({orders: result})
        })
        .catch(err => res.json({error: 'could not fetch orders'}));
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