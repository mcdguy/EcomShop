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
    quantity: {
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
})

module.exports = mongoose.model('Product',productSchema);