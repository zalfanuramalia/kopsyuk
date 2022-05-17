const product = require('express').Router()

const { postProduct, delProduct, patchProduct, dataProduct, detailProduct } = require('../controllers/product')

product.get('/', dataProduct)
product.get('/:id', detailProduct)
product.post('/', postProduct)
product.delete('/:id', delProduct)
product.patch('/:id', patchProduct)

module.exports = product
