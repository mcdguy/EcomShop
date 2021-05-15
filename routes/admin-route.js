const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleAdminAuth} = require('../utils/handleAdminAuth');
const {forgotPassword,transporter} = require('../utils/nodemailer');
const adminAuth = require('../middleware/admin-middleware');
//admin, read-only, edit-only

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const createToken = (id) =>{
    return jwt.sign({id},process.env.AD_SEC,{expiresIn:maxAge});
}
//find all admins
router.get('/',adminAuth(['admin']),(req,res)=>{
    Admin.find().sort({"createdAt": -1})
        .then(result=>{
            res.json({admin: result});
        })
        .catch(err =>{
            res.json({error: 'an error occurred'});
        })
})
//find an admin
router.get('/find/:id',adminAuth(['admin']),(req,res)=>{
    const {id} = req.params;
    Admin.findById(id)
        .then(result=>{
            res.json({admin: result});
        })
        .catch(err =>{res.json({error: 'an  error occurred'})});
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    Admin.findOne({email})
        .then(result=>{
            if(!result) return res.send({errors: {email: 'invalid email',password: ''}});
             bcrypt.compare(password,result.password)
             .then((isMatch)=>{
                if(!isMatch) return res.send({errors: {email: '',password: 'invalid password'}});
                const token = createToken(result._id);
                res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true,sameSite: 'None', secure: true});
                res.send({success: 'admin logged in',type:result.role});
            }).catch(err=>{
                console.log(err);
                res.json({errors: {email: '',password: 'an error occurred'}});
            })
        })
        .catch(err => res.json({errors: {email: 'email does not exist',password: ''}}));
})
router.post('/logout',(req,res)=>{
    // console.log('logout');
    res.clearCookie('jwt');
    res.json({success: 'admin logged out'});
})

router.get('/status',(req,res)=>{
    // console.log('hello');
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.AD_SEC,(err,decodedToken)=>{
            if(err){
                console.log('token not valid',err);
                res.json({error: 'access denied'});
            }
            else{
                Admin.findById(decodedToken.id)
                    .then(result=>{
                        // console.log(result);
                        return res.json({success: 'admin logged in',type: result.role})
                    })
                    .catch(err =>{res.json({error: 'an error occurred'})});
                // console.log(decodedToken);
            }
        })
    }
    else{
        res.json({error: 'an error occurred'});
    }
})

router.post('/forgotpassword',(req,res)=>{
    const {email} = req.body;
    User.findOne({email})
        .then(result=>{
            if(!result) return res.json({error: 'email not registered'});
            const secret = process.env.FORGOT__PASS + result.password;
            const payload = {email:result.email,id:result._id};
            const token = jwt.sign(payload,secret,{expiresIn:'15m'});
            const link = `http://localhost:3000/change-password/${result._id}/${token}`;
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

//update admin
router.post('/',adminAuth(['admin']),async (req,res)=>{
    let {email,password,role,name} = req.body;
    const errors = handleAdminAuth(email,password,role,name);
    if(errors.email !==''){
        return res.json({error: errors.email});
    }
    if(errors.password !==''){
        return res.json({error: errors.password});
    }
    if(errors.role !== ''){
        return res.json({error: errors.role});
    }
    if(errors.name !==''){
        return res.json({error: errors.name});
    }
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);
    Admin.create({email,password,role,name})
        .then(result=>{
            res.send({success: 'admin created successfully'});
        })
        .catch(err =>{
            if(err.code === 11000){
                return res.json({error: 'email already exists'}); 
            }
            return res.json({error: 'an error occurred'});
        })
})

//edit admin
router.patch('/edit-role/:id',adminAuth(['admin']),(req,res)=>{
    const {role} = req.body;
    const {id} = req.params;
    let error='';
    if(!(role === 'admin' || role === 'read admin' || role === 'edit admin')){
        error  = 'invalid admin type';
        return res.json({error});
    }
    Admin.findByIdAndUpdate(id,{role})
        .then(result=>{
            res.json({success: 'admin updated successfully'});
        })
        .catch(err =>{
            res.json({error: 'could not update admin'});
        })
})
//delete admin
router.delete('/delete-admin/:id',adminAuth(['admin']),(req,res)=>{
    const {id} = req.params;
    Admin.findByIdAndDelete(id)
        .then(result =>{
            res.json({success: 'admin deleted successfully'});
        })
        .catch(err =>{
            res.json({error: 'could not delete admin'});
        })
})

module.exports = router;