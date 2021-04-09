const mongoose = require('mongoose');
// const {isEmail} = require('validator');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

const cartItemSchema = new Schema({
    productId:String,
    pqty: Number
},{ _id : false })//this will ensure no id is created and i can directly use array in frontend


const addressSchema = new Schema({
    addressLine:{
        type: String,
        // required: true
    },
    state:{
        type: String,
        // required: [true,'please enter a state'],
    },
    city: {
        type: String,
        // required: [true, 'please enter a city'],
    },
    pin: {
        type: Number,
        // required: [true,'please enter a pincode'],
    },
    contact: {
        type: Number,
        // required: [true, 'please enter your contact number']
    },
    // userId: {
    //     type: String,
    //     required: true
    // }
    // type: {
    //     type: String,
    //     enum: [['primary','secondary'],'address should be either primary or secondary']
    // }
},{ _id : false })

const singleOrder = new Schema({
    productId: String,
    qty: Number,
    name: 'String',
    price: Number,
})
const userSchema = new Schema({
    email: {
        type: String,
        // required: [true,'please enter an email'],
        unique: true,
        lowercase: true,
        // validate: [isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        // required: [true,'please enter a password'],
        // minlength: [6,'minimum password length is 6 characters']
    },
    username: {
        type: String,
    },
    // role:{
    //     type: String,
    //     enum: [['user','admin'],'incorrect user type']
    // },
    cart: {
        type: [cartItemSchema],
        default: () => ([])
    },
    address: {
        type: addressSchema
    }
 });

// userSchema.pre('save',async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// })


const User = mongoose.model('User',userSchema);
module.exports = User;