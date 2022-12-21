const { Product } = require('../../model')

const validationProductExist = (req, res, next) => {
  Product.findById({ _id: req.body.product_id }, (err, docs) => {
    if (err) {
      res.status(404).send({
        error: {
          name: err.name,
          reason: err.reason,
          message: err.message
        }
      })
    } else {
      next()
    }
  })
}

module.exports = {
  validationProductExist
}
