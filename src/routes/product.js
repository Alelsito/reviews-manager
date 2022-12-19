const express = require('express')
const router = express.Router()
const { Product } = require('../model')
const { validationPostProduct } = require('../middleware/product')

// Post
router.post('/', validationPostProduct, (req, res) => {
  const product = new Product()
  product.name = req.body.name
  product.description = req.body.description
  product.price = req.body.price
  product.in_offer = req.body.in_offer
  product.offer_percentage = req.body.offer_percentage
  product.category = req.body.category
  product.images = req.body.images

  product.save((error, productStored) => {
    if (error) {
      res.status(500).send({ message: error })
    } else {
      res.status(201).send(productStored)
    }
  })
})

module.exports = router
