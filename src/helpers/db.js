const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  database: 'kopsyuk',
  password: '',
  user: 'root'
})

db.connect()

module.exports = db
