const mongoose = require('mongoose');
const { Schema } = mongoose;

const variantSchema = new Schema({
    productId:{
        type : Schema.Types.ObjectId,
        ref: "Product",
        required : true,
        index : true,
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

variantSchema.index({ productId: 1, color: 1, size: 1 }, { unique: true })

module.exports = mongoose.model("Product_Variant", variantSchema)