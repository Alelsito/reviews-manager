/* eslint-disable camelcase */
const { Product } = require('../../model')

const validationSellerOfSelectedProduct = (req, res, next) => {
  const userInfo = res.locals.info

  Product.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(404).send({ message: err })
    } else {
      if (docs.creator_user_id === userInfo._id || userInfo.role === 'ADMIN') {
        next()
      } else {
        res.status(422).send({
          error: {
            type: 'ValidationError',
            message: 'you must be the creator of the product or have an ADMIN role to have access to this route'
          }
        })
      }
    }
  })
}

module.exports = {
  validationSellerOfSelectedProduct
}
