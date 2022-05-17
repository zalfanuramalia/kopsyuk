const route = require('express').Router()

route.use('/product', require('./product'))

route.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is Running well!'
  })
})

module.exports = route
