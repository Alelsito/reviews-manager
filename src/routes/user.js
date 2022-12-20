const express = require('express')
const router = express.Router()
const { User } = require('../model')

// Get (find all)
router.get('/find/all', (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by id)
router.get('/find/:id', (req, res) => {
  User.findById({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

// Get (find by email)
router.get('/find', (req, res) => {
  User.find({ email: req.query.email }, (err, docs) => {
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
  User.findOneAndUpdate(
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
  User.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      throw err
    } else {
      res.status(200).send({ data: docs })
    }
  })
})

module.exports = router
