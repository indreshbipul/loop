const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    material: {
        type: String,
        trim: true
    },
    warranty: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    serialNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
}, 
{timestamps: true });

module.exports = mongoose.model('Product', productSchema);