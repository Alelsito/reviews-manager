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

module.exports = router
