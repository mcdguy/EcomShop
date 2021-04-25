const express = require('express');
const router = express.Router();
const Location = require('../models/location');

router.get('/',(req,res)=>{
    Location.find()
        .then(result=>{
            res.json({locations: result});
        })
        .catch(err =>{
            res.json({error: 'could not fetch locations'});
        })
})

router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Location.findById(id)
        .then(result=>{
            res.json({location:result});
        })
        .catch(err => console.log(err));
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
    Location.findByIdAndDelete(id)
        .then(result =>{
            res.json({success: 'location deleted successfully'});
        })
        .catch(err =>{
            res.json({error: 'could not delete location'});
        })
})
router.post('/',(req,res)=>{
    const{state,address,timings,pin,subLocation,geometry} = req.body.location;
    console.log(state,address,timings,pin,subLocation,geometry);
    Location.create({state,address,timings,pin,subLocation,geometry})
        .then(result =>{
            res.json({success: 'location added successfully'});
        })
        .catch(err => res.json({error: 'could not create location'}));
})

router.patch('/:id',(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    Location.findByIdAndUpdate(id,req.body,{new:true})
        .then(result=>{
            res.json({success: 'location updated successfully'});
        })
        .catch(result=>{
            res.json({error: 'could not update location'});
        })
})
module.exports = router;
