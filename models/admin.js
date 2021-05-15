const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
    },
    name: {
        type: String
    }
},{timestamps:true});

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;