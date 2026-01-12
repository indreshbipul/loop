const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
     userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true, 
        index : true
     },
     variantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Product_Variant",
        required : true
     },

},{timestamps : true})
wishlistSchema.index({ userId: 1, variantId: 1 }, { unique: true });

module.exports = mongoose.model("Wishlist", wishlistSchema)