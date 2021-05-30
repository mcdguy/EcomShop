const express = require('express');
const router = express.Router();
const {upload} = require('../utils/multer');
const Product = require('../models/product');
const fs = require('fs');
const adminAuth = require('../middleware/admin-middleware');


//getting all products
router.get('/',(req,res)=>{
    Product.find().sort({"createdAt": -1})
        .then((result)=>{
            if(!result){
                res.json({error: 'products not available'});
            }
            res.json({product:result})
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'unable to load products'});
        })
})

//getting a single product
router.get('/shop/:id',(req,res)=>{
    const {id} = req.params;
    Product.findById(id)
    .then(result => 
        {
            if(!result) return res.json({error: 'product not found'});
            res.json(result)
        })
    .catch(err =>{
        logger.log('error',`path: ${req.path}, ${err}`);
        res.json({error: "product doesn't exist"});
    })
})

//admin route - creating a new product 
router.post('/',adminAuth(['admin','edit admin']),upload.array('img',6),(req,res)=>{//setting max count to 6
    const product = {
        name : req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        productId: req.body.productId,
        weight: req.body.weight,
        description: req.body.description,
        category: req.body.category,
        featured: req.body.featured
    };
    product.img = req.files.map(img => `images/${img.filename}`);
    console.log(product);
    Product.create(product)
        .then(result=>{
            res.json({success: 'product created successfully'});
        })
        .catch(err =>{
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'an error occured'})});
})


//admin route - deletes a product
router.delete('/:id',adminAuth(['admin','edit admin']),(req,res)=>{
    const {id} = req.params;
    console.log(id);
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
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not delete product'})
        });
})

//admin route - updates a product
router.patch('/:id',adminAuth(['admin','edit admin']),upload.array('img',6),(req,res)=>{
    const {id} = req.params;
    const update = {
        name : req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        productId: req.body.productId,
        weight: req.body.weight,
        description: req.body.description,
        category: req.body.category,
        featured: req.body.featured
    };
    if(req.files.length){
        console.log('in here',req.files);
        update.img = req.files.map(img => `images/${img.filename}`);
    }
    console.log(id,update);

    if(!req.files.length){//if no files are sent update the product
        Product.findByIdAndUpdate(id,{$set: update},{new:true})
        .then(result=>{
            res.json({success: 'product edited successfully'});
        })
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not update product'})
        });
    }
    else{//if files are sent delete old files and then upload new ones
        Product.findById(id)
        .then(result=>{
            result.img.forEach(image =>{
                if(fs.existsSync(`./${image}`)){
                    fs.unlink(`./${image}`,(err)=>console.log(err));
                }
            });
            return Product.findByIdAndUpdate(id,{$set: update},{new:true});
        })
        .then(result=>{
            res.json({success: 'product edited successfully'});
        })
        .catch(err => {
            logger.log('error',`path: ${req.path}, ${err}`);
            res.json({error: 'could not update product'})
        });
    }
    
})


module.exports = router;