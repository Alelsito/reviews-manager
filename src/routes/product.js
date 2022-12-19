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

// Get (find all)
router.get('/find/all', (req, res) => {
  Product.find({}, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by id)
router.get('/find/:id', (req, res) => {
  Product.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by name)
router.get('/find', (req, res) => {
  Product.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

module.exports = router
