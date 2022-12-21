/* eslint-disable camelcase */
const yup = require('yup')

const validationPostOrder = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    product_id,
    delivered
  } = req.body

  const user_id = res.locals.info._id

  const schema = yup.object().shape({
    product_id: yup.string().required().strict(),
    user_id: yup.string().required(),
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
        res.status(422).send({
          error: {
            type: message.name,
            message: message.errors[0]
          }
        })
      }
    })
}

module.exports = { validationPostOrder }
