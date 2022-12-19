/* eslint-disable camelcase */
const yup = require('yup')

const validationPostReview = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    title,
    description,
    score,
    user_id,
    product_id
  } = req.body

  const schema = yup.object().shape({
    title: yup.string().required().strict(),
    description: yup.string().required().strict(),
    score: yup.number().required().integer().min(0).max(5),
    user_id: yup.string().required().strict(),
    product_id: yup.string().required().strict()
  })

  schema
    .validate({
      title,
      description,
      score,
      user_id,
      product_id
    })
    .then((valid) => {
      isValid = valid
    })
    .catch((err) => {
      message = err
    })
    .then(() => {
      if (isValid) {
        next()
      } else {
        res.send({
          error: {
            type: message.name,
            message: message.errors[0]
          }
        })
      }
    })
}

module.exports = { validationPostReview }
