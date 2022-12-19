/* eslint-disable camelcase */
const yup = require('yup')

const validationPostUser = (req, res, next) => {
  let isValid = false
  let message = ''

  const {
    role,
    first_name,
    last_name,
    email,
    password,
    birth_date,
    gender
  } = req.body

  const schema = yup.object().shape({
    role: yup.string().required().oneOf(['ADMIN', 'CUSTOMER']),
    first_name: yup.string().required().strict(),
    last_name: yup.string().required().strict(),
    email: yup.string().email().required().strict(),
    password: yup
      .string()
      .required()
      .matches(/[a-zA-Z]/)
      .min(8)
      .strict(),
    birth_date: yup.date(),
    gender: yup.string().oneOf(['F', 'M', 'otro'])
  })

  schema
    .validate({
      role,
      first_name,
      last_name,
      email,
      password,
      birth_date,
      gender
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

module.exports = { validationPostUser }
