/* eslint-disable camelcase */
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { Product } = require('../model')
const { validationPostProduct } = require('../middleware/product')
const { validationAdminSeller } = require('../middleware/auth/role-admin-seller')
const { validationSellerOfSelectedProduct } = require('../middleware/product')

// Post
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationPostProduct, validationAdminSeller, (req, res) => {
    const product = new Product()
    product.name = req.body.name
    product.description = req.body.description
    product.price = req.body.price
    product.in_offer = req.body.in_offer
    product.offer_percentage = req.body.offer_percentage
    product.category = req.body.category
    product.images = req.body.images
    product.creator_user_id = res.locals.info._id

    product.save((err, productStored) => {
      if (err) {
        res.status(500).send({ message: err })
      } else {
        res.status(201).send(productStored)
      }
    })
  })

// Get (find all)
router.get('/find/all', (req, res) => {
  Product.find({}, (err, docs) => {
    if (err) {
      res.status(404).send({ message: err })
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by id)
router.get('/find/:id', (req, res) => {
  Product.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(404).send({ message: err })
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by name)
router.get('/find', (req, res) => {
  Product.find({ name: req.query.name }, (err, docs) => {
    if (err) {
      res.status(404).send({ message: err })
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Update
router.patch('/update/:id',
  passport.authenticate('jwt', { session: false }),
  validationAdminSeller,
  validationSellerOfSelectedProduct,
  (req, res) => {
    const key = Object.keys(req.query)[0]
    Product.findOneAndUpdate(
      { _id: req.params.id }, // Valor buscado
      { [key]: req.body.value }, // Nuevo valor
      (err, docs) => {
        if (err) {
          res.status(409).send({ message: err })
        } else {
          res.status(200).send({ data: docs })
        }
      })
  })

// Delete by id
router.delete('/:id',
  validationAdminSeller,
  validationSellerOfSelectedProduct,
  (req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, docs) => {
      if (err) {
        res.status(404).send({ message: err })
      } else {
        res.status(200).send({ data: docs })
      }
    })
  })

module.exports = router
