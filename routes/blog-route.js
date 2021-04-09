const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const requireAuth = require('../middleware/auth-middleware');
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');



//getting all blogs
router.get('/',(req,res)=>{
    console.log('getting all blogs');
    Blog.find()
        .then((result)=>{res.json(result)})
        .catch(err =>{
            console.log(err.message);
            res.json({error: 'unable to load blogs'});
        })
})

//getting a single blog
router.get('/read/:id',(req,res)=>{
    console.log('getting single blog');
    const {id} = req.params;
    Blog.findById(id)
    .then(result => res.json(result))
    .catch(err =>{
        console.log(err.message);
        res.json({error: "blog doesn't exist"});
    })
})

//creating a new blog
router.post('/',(req,res)=>{
    console.log('creating new blog');
    const blog = req.body;    
    Blog.create(blog)
        .then(result=>res.json(result))
        .catch(err =>{res.json({err: 'an error occured'})});//here i need validation
})

//deleting a blog
router.delete('/:id',(req,res)=>{
    console.log('deleting a blog');
    const {id} = req.params;
    Blog.findByIdAndDelete(id)
        .then(result=>res.json({msg: 'blog deleted successfully'}))
        .catch(err => res.json({error: 'can not delete this blog'}));
})

//updating a product
router.patch('/:id',(req,res)=>{
    console.log('updating a blog');
    const {id} = req.params;
    let update = req.body;

    Blog.findByIdAndUpdate(id, update, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json({err: 'could not update product'}));
})

module.exports = router;