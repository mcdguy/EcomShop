const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/locations',(req,res)=>{
    Location.find()
        .then(result=>{
            res.json({locations: result});
        })
        .catch(err =>{
            res.json({error: 'could not fetch locations'});
        })
})

router.post('/locations',(req,res)=>{
    const{state,address,timings,pin,subLocation,geometry} = req.body;
    Location.create({state,address,timings,pin,subLocation,geometry})
        .then(result =>{
            res.json({success: 'location added successfully'});
        })
        .catch(err => res.json({error: 'could not create location'}));
})

router.patch('/locations:id',(req,res)=>{
    const {id} = req.params;
    Location.findByIdAndUpdate(id,req.body,{new:true})
        .then(result=>{
            res.json({success: 'location updated successfully'});
        })
        .catch(result=>{
            res.json({error: 'could not update location'});
        })

})
module.exports = router;
