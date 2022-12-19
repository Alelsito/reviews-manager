const mongoose = require('mongoose')

const { Schema } = mongoose

const OrderSchema = Schema(
  {
    product_id: String,
    user_id: String,
    delivered: Boolean
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Order', OrderSchema)
