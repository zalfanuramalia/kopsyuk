const db = require('../helpers/db')

exports.dataAllProduct = (data, cb) => {
  db.query(`SELECT * FROM product WHERE name LIKE '%${data.search}%' LIMIT ${data.limit} OFFSET ${data.offset}`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.countProduct = (data, cb) => {
  db.query(`SELECT COUNT(*) as total FROM product WHERE name LIKE '%${data.search}%'`, (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.detailDataProduct = (id, cb) => {
  db.query('SELECT * FROM product WHERE id = ?', [id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.postProduct = (data) => new Promise((resolve, reject) => {
  db.query(`INSERT INTO product (name, price, stock, image) VALUES ('${data.name}', '${data.price}', '${data.stock}', '${data.image}')`, (error, res) => {
    if (error) reject(error)
    resolve(res)
  })
})

exports.getPostProduct = () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM product ORDER BY id DESC LIMIT 1', (error, res) => {
    if (error) reject(error)
    resolve(res)
  })
})

exports.delProduct = (id, cb) => {
  db.query('DELETE FROM product WHERE id = ?', [id], (error, res) => {
    if (error) throw error
    cb(res)
  })
}

exports.getDelProduct = (dataID, cb) => {
  db.query('SELECT * FROM product WHERE id = ?', [dataID], (err, res) => {
    if (err) throw err
    cb(res)
  })
}

exports.patchProduct = (data, id, cb) => {
  db.query('UPDATE product SET name = ?, price = ?, stock = ?, image = ? WHERE id = ?', [data.name, data.price, data.stock, data.image, id], (error, res) => {
    if (error) throw error
    cb(res)
  })
}

exports.getPatchProduct = (id, cb) => {
  db.query('SELECT * FROM product WHERE id = ?', [id], (err, res) => {
    if (err) throw err
    cb(res)
  })
}
