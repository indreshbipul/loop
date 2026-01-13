const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["active", "ordered", "abandoned"],
    default: "active"
  },
  currency: {
    type: String,
    default: "INR"
  },
   lastActivityAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

cartSchema.index({ userId: 1, status: 1 })

module.exports = mongoose.model("Cart", cartSchema)
