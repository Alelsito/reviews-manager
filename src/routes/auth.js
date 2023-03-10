const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { validationPostUser } = require('../middleware/user')

// Post (SignUp)
router.post(
  '/signup',
  validationPostUser,
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.send({
      message: 'Signup successful',
      user: req.user
    })
  }
)

// Post (Login)
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return next(info)
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error)

              const body = { _id: user._id, email: user.email }
              const token = jwt.sign({ user: body }, process.env.SECRET_KEY)

              return res.send({ token })
            }
          )
        } catch (error) {
          return next(error)
        }
      }
    )(req, res, next)
  }
)

module.exports = router
