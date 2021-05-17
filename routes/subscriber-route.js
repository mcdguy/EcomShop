const { request } = require('express');
const express = require('express');
const router = express.Router();
// router.get('/',(req,res)=>{
//     Subscriber.find
// })

router.post('/',(req,res)=>{
    const {email} = req.body;
    console.log(email);
    const mcData = {
        member:[
            {
                email_address: email,
                status: 'pending'
            }
        ]
    }
    const options = {
        url:'',
        method: 'POST',
        headers: {
            Authorization: 'auth..'
        },
        body: mcData
    }
    if(email){
        request(options)
        //successful so far
    }else{

    }
    // res.json({error:'ivalid email'});
})
module.exports = router;