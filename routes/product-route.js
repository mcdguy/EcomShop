const express = require('express');
const router = express.Router();
const {upload} = require('../utils/multer');
const Product = require('../models/product');
const fs = require('fs');


//getting all products
router.get('/',(req,res)=>{
    // console.log('getting all products');
    Product.find()
        .then((result)=>{
            res.json(result)
        })
        .catch(err =>{
            console.log(err.message);
            res.json({error: 'unable to load products'});
        })
})

//getting a single product
router.get('/shop/:id',(req,res)=>{
    // console.log('getting single product');
    const {id} = req.params;
    Product.findById(id)
    .then(result => res.json(result))
    .catch(err =>{
        console.log(err.message);
        res.json({error: "product doesn't exist"});
    })
})

//getting a single product from product id 
router.get('/find/',(req,res,next)=>{
    // console.log('in find');
    console.log(req.query.p);
    const {p} = req.query;
    //if i don't pass query this will run page not found middleware in app.js
    if(!p){
        res.json({error: 'product not found'});
        return;
    }

    Product.find({productId:p})//if id is unique findOne will work
        .then((result) => res.json(result))
        .catch(err =>{
            console.log(err.message);
            res.json({error: "product id doesn't match"});
        })
        //it returns empty array if i pass invalid p so i should check if it's empty array the product id doesn't match
})

//creating a new product
router.post('/',upload.array('img',6),(req,res)=>{//setting max count to 6
    // console.log('creating new product');
    const product = req.body;
    product.img = req.files.map(img => `images/${img.filename}`);
    
    Product.create(product)
        .then(result=>res.json(result))
        .catch(err =>{res.json({err: 'an error occured'})});//here i need validation
})


//deleting a product
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    Product.findByIdAndDelete(id)
        .then(result=>{
            console.log(result.img);
            result.img.forEach(image =>{
                if(fs.existsSync(`./${image}`)){
                    fs.unlink(`./${image}`,(err)=>console.log(err));
                }
            });
            res.json({success: 'product deleted successfully'});
        })
        .catch(err => res.json({error: 'could not delete product'}));
})

//updating a product
router.patch('/:id',upload.array('img',6),(req,res)=>{
    const {id} = req.params;
    let update = req.body;
    if(req.files.length){
        console.log('in here',req.files);
        update.img = req.files.map(img => `images/${img.filename}`);
    }
    Product.findById(id)
        .then(result=>{
            result.img.forEach(image =>{
                if(fs.existsSync(`./${image}`)){
                    fs.unlink(`./${image}`,(err)=>console.log(err));
                }
            });
            return Product.findByIdAndUpdate(id,{$set: update},{new:true});
        })
        .then(result => res.json(result))
        .catch(err => res.json({err: 'could not update product'}));
})

//suggested routes
//updating quantity only
//updating single image
module.exports = router;