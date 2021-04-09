//file not being used

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const addressSchema = new Schema({
    addressLine:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: [true,'please enter a state'],
    },
    city: {
        type: String,
        required: [true, 'please enter a city'],
    },
    pin: {
        type: Number,
        required: [true,'please enter a pincode'],
    },
    number: {
        type: Number,
        required: [true, 'please enter your contact number']
    },
    userId: {
        type: String,
        required: true
    }
    // type: {
    //     type: String,
    //     enum: [['primary','secondary'],'address should be either primary or secondary']
    // }
})

const Address = mongoose.model('Address',addressSchema);
module.exports = Address;