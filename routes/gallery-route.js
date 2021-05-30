const express = require('express');
const Gallery = require('../models/gallery');
const router = express.Router();
const adminAuth = require('../middleware/admin-middleware');


//getting all videos
router.get('/',(req,res)=>{
    Gallery.find().sort({"createdAt": -1})
        .then((result)=>{
            if(!result) return res.json({error: 'videos not available'});
            res.json({videos: result});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error:err})
        });
})


//getting video by id
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Gallery.findById(id)
        .then(result=>{
            if(!result) return res.json({error: 'could not find record'});
            res.json({video: result});
        })
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'an error occured'})
        });
})

//admin route - creates a video
router.post('/',adminAuth(['admin','edit admin']),(req,res)=>{
    const {url,title,body} = req.body;
    const video = {url,title,body};
    Gallery.create(video)
        .then(result=>{
            res.json({success: 'video created successfully'});
        })
        .catch(err=>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'an error occured'});
        })
})

//admin route - deletes a video
router.delete('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    Gallery.findByIdAndDelete(id)
        .then(()=>{
            res.json({success: 'video deleted successfully'});
        })
        .catch((err)=>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not delete video'})
        });
})


//admin route - updates a video
router.patch('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params
    const {url,title,body} = req.body;
    const video = {url,title,body};
    console.log(video);
    Gallery.findByIdAndUpdate(id,video)
        .then(()=>{
            res.json({success: 'video updated successfully'});
        })
        .catch((err)=>{    
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not update video'})
        });
})

module.exports = router;