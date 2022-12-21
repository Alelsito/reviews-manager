const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = Schema(
  {
    name: String,
    description: String,
    price: Number,
    in_offer: Boolean,
    offer_percentage: Number,
    category: String,
    images: [{ image: String }],
    creator_user_id: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Product', ProductSchema)
