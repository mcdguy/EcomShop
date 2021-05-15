const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter the name of product'],
    },
    price: {
        type: Number,
        required: [true, 'please enter the price of product']
    },
    stock: {
        type: Number,
        required: [true, "quantity can not be empty"]
    },
    productId: {
        type: String,
        lowercase: true
    },
    img: [String],
    weight: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
    }
},{timestamps:true});

module.exports = mongoose.model('Product',productSchema);