const { validationPostProduct } = require('./post')
const { validationSellerOfSelectedProduct } = require('./seller-of-product')
const { validationProductExist } = require('./product-exist')

module.exports = {
  validationPostProduct,
  validationSellerOfSelectedProduct,
  validationProductExist
}
