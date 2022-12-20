const express = require('express')
const router = express.Router()
const { User } = require('../model')
const { validationPostUser } = require('../middleware/user')

// Post
router.post('/', validationPostUser, (req, res) => {
  const user = new User()
  user.role = req.body.role
  user.first_name = req.body.first_name
  user.last_name = req.body.last_name
  user.email = req.body.email
  user.password = req.body.password
  user.birth_date = req.body.birth_date
  user.gender = req.body.gender

  user.save((error, userStored) => {
    if (error) {
      res.status(500).send({ message: error })
    } else {
      res.status(201).send(userStored)
    }
  })
})

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
