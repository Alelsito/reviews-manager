/* eslint-disable camelcase */
const yup = require('yup')

const validationPostProduct = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    name,
    description,
    price,
    in_offer,
    offer_percentage,
    category,
    images,
    creator_user_id
  } = req.body

  const schema = yup.object().shape({
    name: yup.string().required().strict(),
    description: yup.string().required().strict(),
    price: yup.number().required().positive(),
    in_offer: yup.boolean().required(),
    offer_percentage: yup.number().required().integer().min(0).max(100),
    category: yup.string().required().strict(),
    images: yup.array().required(),
    creator_user_id: yup.string().required().strict()
  })

  schema
    .validate({
      name,
      description,
      price,
      in_offer,
      offer_percentage,
      category,
      images,
      creator_user_id
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

module.exports = { validationPostProduct }
