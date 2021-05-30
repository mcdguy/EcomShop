const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const adminAuth = require('../middleware/admin-middleware');

//getting all locations
router.get('/',(req,res)=>{
    Location.find().sort({"createdAt": -1})
        .then(result=>{
            if(!result) return res.json({error: 'locations not available'});
            res.json({locations: result});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not fetch locations'});
        })
})

//getting location by id
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Location.findById(id)
        .then(result=>{
            res.json({location:result});
        })
        .catch(err =>{ 
            logger.log('error',`path: ${req.path}, ${err}`);
        });
})

//admin route - deletes a location
router.delete('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    console.log(id);
    Location.findByIdAndDelete(id)
        .then(result =>{
            res.json({success: 'location deleted successfully'});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not delete location'});
        })
})

//admin route - creates a location
router.post('/',adminAuth(['admin','edit admin']),(req,res)=>{
    const{state,address,timings,pin,subLocation,geometry} = req.body.location;
    console.log(state,address,timings,pin,subLocation,geometry);
    Location.create({state,address,timings,pin,subLocation,geometry})
        .then(result =>{
            res.json({success: 'location created successfully'});
        })
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not create location'})
        });
})

//admin route - updates a location
router.patch('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    console.log(req.body)
    Location.findByIdAndUpdate(id,req.body,{new:true})
        .then(result=>{
            res.json({success: 'location updated successfully'});
        })
        .catch(err=>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not update location'});
        })
})
module.exports = router;
