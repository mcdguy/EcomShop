const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {isEmail} = require('validator');
// const bcrypt = require('bcrypt');

const cartItemSchema = new Schema({
    productId:String,
    pqty: Number
},{ _id : false })//this will ensure no id is created and i can directly use array in frontend


const addressSchema = new Schema({
    addressLine:{
        type: String,
    },
    state:{
        type: String,
    },
    city: {
        type: String,
    },
    pin: {
        type: Number,
    },
    contact: {
        type: Number,
    }
},{ _id : false })

//structure for orders is [{order:[singleOrderItem]},{order:[singleOrderItem]}]
//here object represents a single order
const singleOrderItem = new Schema({
    img: String,
    itemId: String,
    productId: String,
    pqty: Number,
    name: String,
    price: Number,
},{ _id : false })

const SingleOrder = new Schema({
    order: {
        type: [singleOrderItem]
    },
    amount: {
        type: Number
    },
    orderId:{
        type: String
    }
},{ _id : false })

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
    },
    username: {
        type: String,
    },
    cart: {
        type: [cartItemSchema],
        default: () => ([])
    },
    address: {
        type: addressSchema
    },
    orders: {
        type: [SingleOrder],
        // default: () => ([])
    }
 },{timestamps:true});

// userSchema.pre('save',async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })


const User = mongoose.model('User',userSchema);
module.exports = User;