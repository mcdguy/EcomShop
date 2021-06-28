const express = require('express');
const router = express.Router();
const request = require('request')
const logger = require('../utils/logger');

router.post('/',(req,res)=>{
    const {email,name} = req.body;
    if(!name){
        return res.json({error: 'please enter name'});
    }
    if(!email){
        return res.json({error: 'please enter an email'});
    }
    const data = {
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    }
    const postData = JSON.stringify(data);
    const options = {
        url:'https://us1.api.mailchimp.com/3.0/lists/cf8281684d',
        method: 'POST',
        headers: {
            Authorization: `auth ${process.env.MC_KEY}`
        },
        body: postData
    }
    request(options,(err,response,body)=>{
        console.log(response);
        if(err){
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            return res.json({error: 'subscription failed'})
        }else{
            if(res.statusCode === 200){
                return res.json({success: 'subscription successful'});
            }else{
                return res.json({error: 'subscription failed'})
            }
        }
    });
})
module.exports = router;