const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },

  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product_Variant",
    required: true
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1
  },

  priceAtAdd: {
    type: Number,
    required: true
  }

}, { timestamps: true })

cartItemSchema.index({ cartId: 1 })
cartItemSchema.index({ cartId: 1, variantId: 1 }, { unique: true })

module.exports = mongoose.model("CartItem", cartItemSchema)
