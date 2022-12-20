const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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

UserSchema.pre(
  'save',
  async function (next) {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
    next()
  }
)

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}

module.exports = mongoose.model('User', UserSchema)
