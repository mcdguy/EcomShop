const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    code:{
        type: String
    },
    discount:{
        type: Number
    }
},{timestamps:true})

const Coupon = mongoose.model('Coupon',couponSchema);
module.exports = Coupon;