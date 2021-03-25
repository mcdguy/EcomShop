const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const cartItemSchema = new Schema({
    productId:String,
    pqty: Number
})

const addressSchema = new Schema({
    state:{
        type: String,
        required: [true,'please enter a state'],
    },
    pincode: {
        type: Number,
        required: [true,'please enter a pincode'],
    },
    address:{
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: [true, 'please enter your contact number']
    },
    // type: {
    //     type: String,
    //     enum: [['primary','secondary'],'address should be either primary or secondary']
    // }
})

const singleOrder = new Schema({
    productId: String,
    qty: Number,
    name: 'String',
    price: Number,
})
const userSchema = new Schema({
    email: {
        type: String,
        required: [true,'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'please enter a password'],
        minlength: [6,'minimum password length is 6 characters']
    },
    // role:{
    //     type: String,
    //     enum: [['user','admin'],'incorrect user type']
    // },
    address: {
        type: addressSchema,
        default: {}
    },
    cart: {
        type: [cartItemSchema],
        default: []
    },
 });

// userSchema.pre('save',async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })


const User = mongoose.model('User',userSchema);
module.exports = User;