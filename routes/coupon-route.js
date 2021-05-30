const express = require('express');
const router = express.Router();
const Coupon = require('../models/coupon');
const adminAuth = require('../middleware/admin-middleware');

//admin route - get all coupons
router.get('/',adminAuth(['all']),(req,res)=>{
    Coupon.find().sort({"createdAt": -1})
        .then(result=>{
            if(!result){
                return res.json({error: 'could not fetch coupons'});
            }
            res.json({coupon: result});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not fetch coupons'});
        })
})

//verify a coupon
router.post('/check',(req,res)=>{
    const {code} = req.body;
    Coupon.findOne({code})
        .then(coupon=>{
            console.log(coupon);
            if(!coupon) return res.json({nomatch:'invalid coupon'});
            res.json({success: 'coupon matched',discount: coupon.discount});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: ' an error occured'});
        })
})

//getting coupon by id
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
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'an error occured'});
        })
})

//admin route - creates a coupon
router.post('/',adminAuth(['admin','edit admin']),(req,res)=>{
    const {code,discount} = req.body;
    console.log(code,discount);
    Coupon.create({code,discount})
        .then(result=>{
            res.json({success: 'coupon created successfully'});
        })
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({erorr: 'could not create coupon'})
        });
})

//admin route - updates a coupon
router.patch('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    const {discount} = req.body;
    if(!discount){
        return res.json({error: 'could not update coupon'});
    }

    Coupon.findByIdAndUpdate(id,{discount},{new:true})
        .then(result=>{
            console.log(result);
            res.json({success: 'coupon updated successfully'});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not update coupon'});
        })
    
})

//admin route - deletes a coupon
router.delete('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    Coupon.findByIdAndDelete(id)
        .then(result=>{
            res.json({success: 'coupon deleted successfully'});
        })
        .catch(err => { 
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'an error occured'})
        });
})
module.exports = router;