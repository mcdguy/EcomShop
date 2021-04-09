// not using anymore
const express = require('express');
const router = express.Router();
const Address = require('../models/address');
const requireAuth = require('../middleware/auth-middleware');
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');
const {checkUser} = require('../utils/userDetails');


const handleErrors = (err) =>{
    let errors = {addressLine: '',state:'',city: '',pin: '',number: ''}
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(error=>{
            errors[error.properties.path] = error.properties.message;
        })
    }
    return errors;
}

router.get('/',requireAuth,(req,res)=>{
    // we are here that means user is logged in
    const token = req.cookies.jwt;
    const id = checkUser(token);
    Address.findOne({userId: id})
        .then(result =>{
            if(!result){
                res.json({failure: 'address not found'});
                return;
            }
            res.json({address: result});
        })
        .catch(err => res.json({error: 'something went wrong'}));
});

router.post('/',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const userId = checkUser(token);
    const {addressLine,state,city,pin,number} = req.body;

    Address.create({addressLine,state,city,pin,number,userId})
        .then(result =>{
            res.json({success: 'address saved successfully'});
        })
        .catch(err => {
            const errors = handleErrors(err);
            res.json({errors});
        })
})

//one more route for updating
router.patch('/',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const userId = checkUser(token);
})

module.exports = router;
