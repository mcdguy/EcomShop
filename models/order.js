const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billingAddressSchema = new Schema({
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
},{ _id : false });

const shippingAddressSchema = new Schema({
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
},{ _id : false });

const userDetailsSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type: String,
    },
    contact:{
        type: Number
    }
},{ _id : false });

const itemPurchasedSchema = new Schema({
    img:{
        type: String
    },
    itemId:{
        type:String
    },
    productId:{
        type:String
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    pqty:{
        type:Number
    }
},{ _id : false });

const orderSchema = new Schema({
    amount:Number,
    orderId:{type:String},
    receipt: {
        type:String,
    },
    buyer:{
        type: userDetailsSchema,
    },
    billingAddress:{
        type:billingAddressSchema,
    },
    shippingAddress:{
        type:shippingAddressSchema,
    },
    orderItems:{
        type:[itemPurchasedSchema]
    },
    pending:{
        type:Boolean,
        default: true// i can create one more state for cod which will set pending to false if cod is used
    },
    isAddressSame:{
        type: Boolean
    },
    paymentId:{
        type: String
    },
    validity:{
        type:Date,
        // default: (new Date().getTime())
    },
    discount:{
        type:Number,
        default: 0
    },
    id: {
        type: String
    },
    user:{
        type: String
    }
},{timestamps: true});

orderSchema.index({validity: 1});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;