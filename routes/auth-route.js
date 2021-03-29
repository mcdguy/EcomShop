const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireAuth = require('../middleware/auth-middleware');
const { Mongoose } = require('mongoose');


const checkUser =  (token) =>{
    // const token = req.cookies.jwt;
    let id = null
    if(token){
        jwt.verify(token,process.env.AUTH_SECRET,(err,decodedToken)=>{
            if(err){
                console.log('token is not valid');
                return null;
            }
            else{
                 id = decodedToken.id;
                 //dunno why but returning id here was giving undefined so i created a variable
            }
        })
    }
    else{
        return null
    }
    return id;
}

const handleErrors = (err) =>{
    let errors = {email: '',password: ''};
    if(err.code === 11000){
        errors.email = 'email already exists';
        return errors;
    }
    console.log(err)
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

//merging cart on login

router.post('/mergecart',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    const frontendCart = req.body.cart;
    User.findById(id)
        .then(user =>{
            const backendCart = user.cart;
            console.log('frontend',frontendCart);
            console.log('backend',backendCart);
            const newCart = [...frontendCart,...backendCart];
            //this is cart productId without duplicates
            const uniqueCartItems = [...new Set(newCart.map(i=>i.productId))];
            // console.log(newCart);
            // console.log(uniqueCartItems);
            let updatedCart = [];
            
            for(let i=0;i<uniqueCartItems.length;i++){
                let productId = newCart[i].productId;
                let pqty = 0;
                for(let k=0;k<newCart.length;k++){
                    if(newCart[i].productId === uniqueCartItems[k]){
                        pqty+=newCart[k].pqty;
                    }
                }//here cart item has been compared with all items in newCart
                updatedCart.push({productId,pqty});
            }
            // console.log(updatedCart);
            // return User.findByIdAndUpdate(id,{cart: updatedCart},{new:true})        
            User.findByIdAndUpdate(id,{$set: {cart: updatedCart}},{new:true})
                .then(result=>{
                    console.log('cart',result.cart);
                    res.json({cart:result.cart});
                })
        })
        .catch(err => res.json({error: 'could not update cart'}));
})


//setting cart on change
router.post('/cart',requireAuth, (req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    const cart = req.body.cart;
    // console.log(cart);
    // console.log(id);
    if(!id){
        res.json({error: 'could not find user'});
        return;
    }

    User.findByIdAndUpdate(id,{cart},{new:true})
        .then(result=>{
            res.json(result);
        })
        .catch(err =>res.json({error: 'an error occured while updating cart'}));
})


//getting cart
router.get('/cart',requireAuth, (req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    
    if(!id){
        res.json([]);//sending empty array
        // res.json({error: 'could not find user'});
        return;
    }

    User.findById(id)
        .then(result=>{
            console.log(result.cart)
            res.json({success:'user found',cart:result.cart});
        })
        .catch(err =>{
                res.json([]);//still sending an empty cart maybe i can send error
            });
})
module.exports = router;