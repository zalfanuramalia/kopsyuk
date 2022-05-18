const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(require('./src/routes'))
app.use('/uploads', express.static('uploads'))

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
