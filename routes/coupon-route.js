const express = require('express');
const router = express.Router();
const Coupon = require('../models/coupon');

router.get('/',(req,res)=>{
    Coupon.find()
        .then(result=>{
            if(!result){
                return res.json({error: 'could not fetch coupons'});
            }
            res.json({coupon: result});
        })
        .catch(err =>{
            res.json({error: 'could not fetch coupons'});
        })
})

router.post('/check',(req,res)=>{
    const {code} = req.body;
    Coupon.findOne({code})
        .then(coupon=>{
            console.log(coupon);
            if(!coupon) return res.json({nomatch:'invalid coupon'});
            res.json({success: 'coupon matched',discount: coupon.discount});
        })
        .catch(err =>{
            res.json({error: ' an error occured'});
        })
})

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Coupon.findById(id)
        .then(result=>{
            if(!result){
                return res.json({error: "coupon doesn't exist"});
            }
            return res.json({coupon: result});
        })
        .catch(err =>{
            res.json({error: 'an error occured'});
        })
})

router.post('/',(req,res)=>{
    const {code,discount} = req.body;
    console.log(code,discount);
    Coupon.create({code,discount})
        .then(result=>{
            res.json({success: 'coupon created successfully'});
        })
        .catch(err => res.json({erorr: 'could not create coupon'}));
})

router.patch('/:id',(req,res)=>{
    const {id} = req.params;
    const {discount} = req.body;
    if(!discount){
        return res.json({error: 'could not update coupon'});
    }
    console.log(discount);

    Coupon.findByIdAndUpdate(id,{discount},{new:true})
        .then(result=>{
            console.log(result);
            res.json({success: 'coupon updated successfully'});
        })
        .catch(err =>{
            res.json({error: 'could not update coupon'});
        })
    
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    Coupon.findByIdAndDelete(id)
        .then(result=>{
            res.json({success: 'coupon deleted successfully'});
        })
        .catch(err => { res.json({error: 'an error occured'})});
})
module.exports = router;