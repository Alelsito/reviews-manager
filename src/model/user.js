const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = Schema(
  {
    role: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    birth_date: Date,
    gender: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('User', UserSchema)
