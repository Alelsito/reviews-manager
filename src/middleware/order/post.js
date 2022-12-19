/* eslint-disable camelcase */
const yup = require('yup')

const validationPostOrder = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    product_id,
    user_id,
    delivered
  } = req.body

  const schema = yup.object().shape({
    product_id: yup.string().required().strict(),
    user_id: yup.string().required().strict(),
    delivered: yup.boolean().required()
  })

  schema
    .validate({
      product_id,
      user_id,
      delivered
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

module.exports = { validationPostOrder }
