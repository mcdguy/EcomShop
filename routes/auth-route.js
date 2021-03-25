const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireAuth = require('../middleware/auth-middleware');

const handleErrors = (err) =>{
    let errors = {email: '',password: ''};
    if(err.code === 11000){
        errors.email = 'email already exists';
        return errors;
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(error=>{
            errors[error.properties.path] = error.properties.message;
        })
    } 
    return errors;
}

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const createToken = (id) =>{
    return jwt.sign({id},process.env.AUTH_SECRET,{expiresIn:maxAge});
}

//creating a user in db
router.post('/signup',async (req,res)=>{
    let {email,password} = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);
    
    User.create({email,password})
        .then(result=>{
            const token = createToken(result._id);
            res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true})
            res.send({success: 'user created successfully'});
        })
        .catch(err =>{
            const errors = handleErrors(err);
            console.log(errors);
            res.json({errors}); 
        })
})

//finding the user in db
router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email})
        .then(result=>{
            if(!result) return res.send({errors: {email: 'invalid email',password: ''}});
             bcrypt.compare(password,result.password)
             .then((isMatch)=>{
                if(!isMatch) return res.send({errors: {email: '',password: 'invalid password'}});
                const token = createToken(result._id);
                res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true});
                res.send({success: 'user logged in'});
            }).catch(err=>{
                res.json({errors: {email: '',password: 'invalid password'}});
            })
        })
        .catch(err => res.json({errors: {email: 'email does not exist',password: ''}}));
})

//checking if user is logged in
router.get('/status',requireAuth,(req,res)=>{
    res.json({success: 'user logged in'});
})

//logging out a user
router.get('/logout',(req,res)=>{
    // res.cookie('jwt','',{maxAge: 1});
    res.clearCookie('jwt');
    res.json({success: 'user logged out'});
})

module.exports = router;