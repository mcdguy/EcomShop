const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {handleAuthErrors} = require('../utils/handleAuthErrors');
const {handleAddressError} = require('../utils/handleAddressError');
const {checkUser} = require('../utils/userDetails');
const requireAuth = require('../middleware/auth-middleware');
const {forgotPassword,transporter} = require('../utils/nodemailer');
const adminAuth = require('../middleware/admin-middleware');

//i could have seperated auth routes and user routes

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const createToken = (id) =>{
    return jwt.sign({id},process.env.AUTH_SECRET,{expiresIn:maxAge});
}
//getting all user admin route
router.get('/',adminAuth(['all']),(req,res)=>{
    let {page,limit} = req.query;
    if(!page){
        page = 1;
    }
    if(!limit){
        limit = 1;
    }
    limit = parseInt(limit);
    skip = (page - 1) * limit;
    User.find().skip(skip).limit(limit).sort({"createdAt": -1})
        .then(result =>{
            res.json({users: result, page,limit});
        })
        .catch(err => res.json({error: 'could not get users'}))
})

//don't know if it is used somewhere outside admin panel
//admin route
router.get('/find/:id',adminAuth(['all']),(req,res)=>{
    const {id} = req.params;
    User.findById(id)
        .then(result=>{
            if(!result){
                return res.json({error: 'user not found'});
            }
            return res.json({user: result});
        })
        .catch(err => res.json({error: 'an error occured'}));
})

//admin route
router.get('/find-user',adminAuth(['all']),(req,res)=>{
    const {filter,query} = req.query;
    let search = {};
    if(filter === 'password'){
        return res.json({error: 'no results found'});
    }
    if(filter === 'contact'){
        search = {"address.contact": query};
    }else{
        search[filter] = query;
    }
    // console.log(search);
    User.find(search)
        .then(result=>{
            // console.log(result);
            if(!result) return res.json({user: []})
            return res.json({user:result});
        })
        .catch(err => res.json({error: 'an error occurred'}));
})

//creating a user in db
router.post('/signup',async (req,res)=>{
    let {email,password,username} = req.body;
    let errors = handleAuthErrors(email,password,username);
    // console.log(errors)
    if(errors.email !=='' || errors.password !=='' || errors.username !==''){
        res.json({errors});
        return;
    }
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);
    
    console.log('singnup');
    User.create({email,password,username})
        .then(result=>{
            const token = createToken(result._id);
            // if(process.env.NODE_ENV === 'production'){
            //     res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true, sameSite: 'None', secure: true})
            // }else{
            //     res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true})
            // }
            res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true})

            res.send({success: 'user created successfully'});
            
        })
        .catch(err =>{
            console.log(err)
            let errors = {email: '',password: ''};
            if(err.code === 11000){
                errors.email = 'email already exists';
            }
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
                // if(process.env.NODE_ENV === 'production'){
                //     res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true, sameSite: 'None', secure: true});
                // }else{
                //     res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true});
                // }
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

router.post('/forgotpassword',(req,res)=>{
    const {email} = req.body;
    User.findOne({email})
        .then(result=>{
            if(!result) return res.json({error: 'email not registered'});
            const secret = process.env.FORGOT__PASS + result.password;
            const payload = {email:result.email,id:result._id};
            const token = jwt.sign(payload,secret,{expiresIn:'15m'});
            const link = `http://localhost:3000/reset-password/${result._id}/${token}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: result.email,
                subject: 'reset password',
                text: forgotPassword(result.username,link)
            }
            // console.log(mailOptions);
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.json({error: 'could not send email'});
                } else {
                    console.log('Email sent: ' + info.response);
                    res.json({success: 'email sent'});
                }
            });
        })
    console.log(email);
    console.log('forgot password');
})

router.post('/update-password',async (req,res)=>{
    let {id,token,password} = req.body;
    //simple password validation in backend
    if(password.length < 6){
        return res.json({error: 'password too short'});
    }
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);
    console.log(password);
    User.findById(id)
        .then(result=>{
            if(!result) return res.json({error: 'user not found'});
            const secret = process.env.FORGOT__PASS + result.password;
            jwt.verify(token,secret,(err,decodedToken)=>{
                if(err){
                    console.log('token is not valid');
                    return res.json({error: 'link has expired'});
                }
                else{
                    console.log(decodedToken);
                    User.findByIdAndUpdate(id,{password},{new:true})
                        .then(result=>{
                            return (res.json({success: 'password reset successful'}));
                        })
                }
            })
        })
        .catch(err => res.json({error: 'an error occurred'}));

})
//merging cart on login

router.post('/mergecart',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    const frontendCart = req.body.cart;
    User.findById(id)
        .then(user =>{
            const backendCart = user.cart;
            // console.log('frontend',frontendCart);
            // console.log('backend',backendCart);
            const newCart = [...frontendCart,...backendCart];
            //this is cart productId without duplicates
            const uniqueCartItems = [...new Set(newCart.map(i=>i.productId))];
            let updatedCart = [];
            
            for(let i=0;i<uniqueCartItems.length;i++){
                // let productId = newCart[i].productId;
                let productId = uniqueCartItems[i];
                let pqty = 0;
                for(let k=0;k<newCart.length;k++){
                    if(uniqueCartItems[i] === newCart[k].productId){
                        pqty+=newCart[k].pqty;
                    }
                }//here cart item has been compared with all items in newCart
                updatedCart.push({productId,pqty});
            }
            // console.log(updatedCart);
            // return User.findByIdAndUpdate(id,{cart: updatedCart},{new:true})        
            User.findByIdAndUpdate(id,{cart: updatedCart},{new:true})
                .then(result=>{
                    // console.log('cart',result.cart);
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


router.get('/orders',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    if(!id){
        res.json({error: 'could not find user'});
        return;
    }
    User.findById(id)
        .then(result=>{
            if(result.orders){
                return res.json({orders:result.orders});
            }
            res.json({orders: []});
        })
        .catch(err => res.json({error: 'something went wrong'}));
})

//now handling address request
//getting address
router.get('/account/address',requireAuth,(req,res)=>{
    // we are here that means user is logged in
    const token = req.cookies.jwt;
    const id = checkUser(token);
    if(!id){
        res.json({error: 'could not find user'});
        return;
    }
    User.findById(id)
        .then(result =>{
            if(!result){
                return res.json({error: 'could not find address'});
            }
            res.json({success:'address found',address: result.address,email: result.email,username: result.username});
        })
        .catch(err => res.json({error: 'something went wrong'}));
});

//updating address
router.post('/account/address',requireAuth,(req,res)=>{
    const token = req.cookies.jwt;
    const id = checkUser(token);
    if(!id){
        res.json({error: 'could not find user'});
        return;
    }
    const {addressLine,state,city,pin,contact} = req.body.address;
    const errors = handleAddressError(addressLine,state,city,pin,contact);
    //console.log(errors);
    if(errors.addressLine !=='' || errors.state !=='' || errors.city !== '' || errors.pin !=='' ||errors.contact !==''){
        res.json({errors});
        return;
    }
    User.findByIdAndUpdate(id,{address:req.body.address},{new:true})
        .then(result=>{
            res.json({success:'address updated'});
        })
        .catch(err =>res.json({error: 'an error occured while updating address'}));
})




module.exports = router;