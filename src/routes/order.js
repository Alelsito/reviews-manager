const express = require('express')
const router = express.Router()
const { Order } = require('../model')
const { validationPostOrder } = require('../middleware/order')

// Post
router.post('/', validationPostOrder, (req, res) => {
  const order = new Order()
  order.product_id = req.body.product_id
  order.user_id = req.body.user_id
  order.delivered = req.body.delivered

  order.save((error, orderStored) => {
    if (error) {
      res.status(500).send({ message: error })
    } else {
      res.status(201).send(orderStored)
    }
  })
})

// Get (find all)
router.get('/find/all', (req, res) => {
  Order.find({}, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by id)
router.get('/find/:id', (req, res) => {
  Order.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by product_id & user_id)
router.get('/find', (req, res) => {
  Order.find({
    product_id: req.query.product_id,
    user_id: req.query.user_id
  }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Update
router.patch('/update/:id', (req, res) => {
  const key = Object.keys(req.query)[0]
  Order.findOneAndUpdate(
    { _id: req.params.id }, // Valor buscado
    { [key]: req.body.value }, // Nuevo valor
    (err, docs) => {
      if (err) {
        throw err
      } else {
        res.status(200).send({ data: docs })
      }
    })
})

// Delete by id
router.delete('/:id', (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

module.exports = router
