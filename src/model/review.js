const mongoose = require('mongoose')

const { Schema } = mongoose

const ReviewSchema = Schema(
  {
    title: String,
    description: String,
    score: Number,
    user_id: String,
    product_id: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Review', ReviewSchema)
