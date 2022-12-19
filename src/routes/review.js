const express = require('express')
const router = express.Router()
const { Review } = require('../model')
const { validationPostReview } = require('../middleware/review')

// Post
router.post('/', validationPostReview, (req, res) => {
  const review = new Review()
  review.title = req.body.title
  review.description = req.body.description
  review.score = req.body.score
  review.user_id = req.body.user_id
  review.product_id = req.body.product_id

  review.save((error, reviewStored) => {
    if (error) {
      res.status(500).send({ message: error })
    } else {
      res.status(201).send(reviewStored)
    }
  })
})

// Get (find all)
router.get('/find/all', (req, res) => {
  Review.find({}, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by id)
router.get('/find/:id', (req, res) => {
  Review.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by title)
router.get('/find', (req, res) => {
  Review.find({ title: req.query.title }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

module.exports = router
