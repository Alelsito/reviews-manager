/* eslint-disable camelcase */
const jwt_decode = require('jwt-decode')
const { User } = require('../../model')

const validationAdminSeller = (req, res, next) => {
  const userInfo = jwt_decode(req.query.secret_token)

  User.findById({ _id: userInfo.user._id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      if (docs.role !== 'CUSTOMER') {
        next()
      } else {
        res.status(200).send({
          error: {
            type: 'ValidationError',
            message: 'to have acces to this route your role must be one of the following: ADMIN, SELLER'
          }
        })
      }
    }
  })
}

module.exports = { validationAdminSeller }