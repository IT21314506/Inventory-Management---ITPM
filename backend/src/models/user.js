const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); 


const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },   
    role: {
        type: String,
        enum: ['buyer', 'store', 'user'],
        default: 'user'
    },date:{
        type:Date,
        default:Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);