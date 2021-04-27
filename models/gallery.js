const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    url:{
        type: String
    },
    title:{
        type: String
    },
    body:{
        type: String
    }
})

const Gallery = mongoose.model('Gallery',gallerySchema);
module.exports = Gallery;