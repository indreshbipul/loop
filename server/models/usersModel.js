//external imports
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum:['male', 'female', 'other'],
        required: true
    },
    mobile:{
        type: String, 
        required: true,
        match: /^[6-9]\d{9}$/,
        unique: true    
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
}, {timestamps : true});
module.exports = mongoose.model('User', userSchema);