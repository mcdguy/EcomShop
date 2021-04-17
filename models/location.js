const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const geoSchema = new Schema({
    type:{//this is a property of geolocation
        type: String,//this is the type of data
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
},{_id : false})

const locationSchema = new Schema({
    state: {
        type: String
    },
    address: {
        type: String
    },
    timings: {
        type: String
    },
    pin: {
        type: Number
    },
    subLocation: {
        type: String
    },
    geometry: geoSchema
})

const Location  = mongoose.model('Location',locationSchema);
module.exports = Location;