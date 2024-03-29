const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const adminAuth = require('../middleware/admin-middleware');
const logger = require('../utils/logger');

//admin route - getting all orders
router.get('/',adminAuth(['all']),(req,res)=>{
    let {cursor} = req.query;
    const limit = 3;
    if(!cursor){
        //log res.data in console on frontend to see what happens in last call
        Order.find().sort({_id:-1}).limit(limit)
            .then(result=>{
                let hasMore = true;
                let cursor = '';
                if(result[result.length-1]){
                    cursor = result[result.length - 1]._id;
                }else{
                    hasMore = false;
                }

                res.json({orders: result, cursor,hasMore})
            })
            .catch(err => {
                logger.log('error',`path: ${req.baseUrl}, ${err}`);
                res.json({error: 'could not fetch orders'})
            });
    }else{
        Order.find({_id:{$lt:cursor}}).sort({_id:-1}).limit(limit)
        .then(result=>{
            let hasMore = true;
            let cursor = '';
            if(result[result.length-1]){
                cursor = result[result.length - 1]._id;
            }else{
                hasMore = false;
            }
            res.json({orders: result, cursor, hasMore})
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'could not fetch orders'})
        });
    }
})


// router.get('/',adminAuth(['all']),(req,res)=>{
//     // console.log('hello');
//     let {page,limit} = req.query;
//     if(!page){
//         page = 1;
//     }
//     if(!limit){
//         limit = 1;
//     }
//     limit = parseInt(limit);
//     skip = (page - 1) * limit;
//     Order.find().skip(skip).limit(limit).sort({"createdAt": -1})
//         .then(result=>{
//                 res.json({orders: result, page,limit})
//         })
//         .catch(err => {
//             logger.log('error',`path: ${req.baseUrl}, ${err}`);
//             res.json({error: 'could not fetch orders'})
//         });
// })

//admin route - find order by query
router.get('/find',adminAuth(['all']),(req,res)=>{
    const {filter,query} = req.query;
    let search = {};
    if(filter === 'email'){
        search = {"buyer.email":query};
    }else if(filter === 'contact'){
        search = {"buyer.contact": query};
    }else{
        search[filter] = query;
    }
    Order.find(search)
        .then(result=>{
            if(!result) return res.json({order: []})
            return res.json({order:result});
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'an error occurred'})
        });
})

//admin route - find order by id
router.get('/:id',adminAuth(['all']),(req,res)=>{
    const {id} = req.params;
    Order.findById(id)
        .then(result =>{
            if(!result){
                return res.json({error: 'order not found'})
            }
            res.json({order: result});
        })
        .catch(err => {
            logger.log('error',`path: ${req.baseUrl}, ${err}`);
            res.json({error: 'an error occured'});
        })
})
module.exports = router;