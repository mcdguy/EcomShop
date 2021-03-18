const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'please enter the title'],
    },
    body: {
        type: String,
        required: [true, 'please enter a body']
    },
    authorId:String
    //we can add author maybe but this is admin based route
},{timestamps: true})

module.exports = mongoose.model('Blog',blogSchema);