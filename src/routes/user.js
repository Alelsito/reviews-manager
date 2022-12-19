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

module.exports = router
