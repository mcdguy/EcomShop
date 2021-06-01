const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {handleAdminAuth} = require('../utils/handleAdminAuth');
const {forgotPassword,transporter} = require('../utils/nodemailer');
const adminAuth = require('../middleware/admin-middleware');
const logger = require('../utils/logger');

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds

//create a jwt token
const createToken = (id) =>{
    return jwt.sign({id},process.env.AD_SEC,{expiresIn:maxAge});
}

//admin route - find all admins
router.get('/',adminAuth(['admin']),(req,res)=>{
    Admin.find().sort({"createdAt": -1})
        .then(result=>{
            res.json({admin: result});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'an error occurred'});
        })
})

//admin route - find admin by id
router.get('/find/:id',adminAuth(['admin']),(req,res)=>{
    const {id} = req.params;
    Admin.findById(id)
        .then(result=>{
            res.json({admin: result});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'an  error occurred'})
        });
})

//admin login
router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    Admin.findOne({email})
        .then(result=>{
            if(!result) return res.send({errors: {email: 'invalid email',password: ''}});
             bcrypt.compare(password,result.password)
             .then((isMatch)=>{
                if(!isMatch) return res.send({errors: {email: '',password: 'invalid password'}});
                const token = createToken(result._id);

                //this is to access cookies in cors
                if(process.env.NODE_ENV === 'production'){
                    res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true,sameSite: 'None', secure: true, path:'/'});
                }else{
                    res.cookie('jwt',token,{maxAge: maxAge*1000, httpOnly: true});
                }
                logger.log('info',`${email} logged in`)
                res.send({success: 'admin logged in',type:result.role});
            })
            .catch(err=>{
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
                res.json({errors: {email: '',password: 'an error occurred'}});
            })
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({errors: {email: 'email does not exist',password: ''}})
        });
})

//admin logout
router.post('/logout',(req,res)=>{
    if(process.env.NODE_ENV === 'production'){
        res.clearCookie('jwt',{httpOnly: true,sameSite: 'None', secure: true, path:'/'});//had to pass options for it to work also some said put domain too but i guess that does not work for heroku
    }else{
        res.clearCookie('jwt');
    }
    res.json({success: 'admin logged out'});
})

//checks admin login status
router.get('/status',(req,res)=>{
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
                        return res.json({success: 'admin logged in',type: result.role})
                    })
                    .catch(err =>{
                        logger.log('error',`path: ${req.baseUrl}, ${err}`);
                        res.json({error: 'an error occurred'})
                    });
            }
        })
    }
    else{
        res.json({error: 'an error occurred'});
    }
})


//forgot password - creates reset link
router.post('/forgotpassword',(req,res)=>{
    const {email} = req.body;
    Admin.findOne({email})
        .then(result=>{
            if(!result) return res.json({error: 'email not registered'});
            const secret = process.env.FORGOT__PASS + result.password;
            const payload = {email:result.email,id:result._id};
            const token = jwt.sign(payload,secret,{expiresIn:'15m'});
            const link = `https://tender-swartz-02e579.netlify.app/reset-password/${result._id}/${token}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: result.email,
                subject: 'reset password',
                text: forgotPassword(result.name,link)
            }
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    logger.log('error',`path: ${req.baseUrl}, email: ${result.email}, ${err}`);
                    res.json({error: 'could not send email'});
                } else {
                    logger.log('info',`path:${req.baseUrl}, email sent: ${info.response}`);
                    res.json({success: 'email sent'});
                }
            });
        })
})


//change password
router.post('/update-password',async (req,res)=>{
    let {id,token,password} = req.body;
    if(password.length < 6){
        return res.json({error: 'password too short'});
    }
    console.log(id);
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password,salt);
    Admin.findById(id)
        .then(result=>{
            console.log(result);
            if(!result) return res.json({error: 'admin not found'});
            const secret = process.env.FORGOT__PASS + result.password;
            jwt.verify(token,secret,(err,decodedToken)=>{
                if(err){
                    // console.log('token is not valid');
                    return res.json({error: 'link has expired'});
                }
                else{
                    // console.log(decodedToken);
                    Admin.findByIdAndUpdate(id,{password},{new:true})
                        .then(result=>{
                            return (res.json({success: 'password reset successful'}));
                        })
                }
            })
        })
        .catch(err =>{
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'an error occurred'});
        });
})


//admin route - create admin
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
            }else{
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
            }
            return res.json({error: 'an error occurred'});
        })
})

//admin route - edit admin
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
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'could not update admin'});
        })
})


//admin route - delete admin
router.delete('/delete-admin/:id',adminAuth(['admin']),(req,res)=>{
    const {id} = req.params;
    Admin.findByIdAndDelete(id)
        .then(result =>{
            res.json({success: 'admin deleted successfully'});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'could not delete admin'});
        })
})

module.exports = router;