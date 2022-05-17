/* eslint-disable n/handle-callback-err */
const productModel = require('../models/product')
const response = require('../helpers/response')
const upload = require('../helpers/upload').single('image')

const dataProduct = (req, res) => {
  let { search, page, limit, tool, sort, loc } = req.query
  search = search || ''
  page = ((page != null && page !== '') ? parseInt(page) : 1)
  limit = ((limit != null && limit !== '') ? parseInt(limit) : 50)
  tool = tool || 'id'
  sort = sort || 'desc'
  const offset = (page - 1) * limit
  const data = { search, page, limit, offset, tool, sort, loc }
  if (data.limit < 0 && data.page < 0) {
    return response(res, 'Page and Limit Must be More Than 0', null, 400)
  }
  if (data.limit < 0) {
    return response(res, 'Limit Must be More Than 0', null, 400)
  }
  if (data.page < 0) {
    return response(res, 'Page Must be More Than 0', null, 400)
  }
  productModel.dataAllProduct(data, (results) => {
    productModel.countProduct(data, (count) => {
      const { total } = count[0]
      const last = Math.ceil(total / limit)
      if (results.length > 0) {
        return res.send({
          success: true,
          message: 'Data Product',
          results,
          pageInfo: {
            prev: page > 1 ? `http://localhost:8080/product?page=${page - 1}` : null,
            next: page < last ? `http://localhost:8080/product?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        })
      } else {
        return res.status(400).send({
          success: false,
          message: 'You must input correctly',
          pageInfo: {
            prev: page > 1 ? `http://localhost:8080/product?page=${page - 1}` : null,
            next: page < last ? `http://localhost:8080/product?page=${page + 1}` : null,
            totalData: total,
            currentPage: page,
            lastPage: last
          }
        })
      }
    })
  })
}

const detailProduct = (req, res) => {
  const dataID = parseInt(req.params.id)
  if (isNaN(dataID) === true) {
    return response(res, 'Data ID must be Number', null, 400)
  }
  productModel.detailDataProduct(dataID, (results) => {
    if (results.length > 0) {
      return response(res, 'Data Product by Id', results[0], 200)
    } else {
      return response(res, 'There is data claim with that ID', null, 404)
    }
  })
}

const postProduct = async (req, res) => {
  try {
    req.fileUpload = 'product'
    upload(req, res, async function (err) {
      const data = { }
      const fillable = ['name', 'price', 'stock']
      fillable.forEach(field => {
        if (req.body[field]) {
          return (data[field] = req.body[field]) // data.qty = req.body.qty
        }
      })

      if (isNaN(data.price) === true) {
        return response(res, 'Price Data must be Number!', null, 400)
      }
      if (isNaN(data.stock) === true) {
        return response(res, 'Quantity Data must be Number!', null, 400)
      }

      if (req.file) {
        const imageTemp = req.file.path
        data.image = imageTemp.replace('\\', '/')
      }
      console.log(req.file)

      if (err) {
        return response(res, 'File image size too large', null, 400)
      }

      const results = await productModel.postProduct(data)
      if (results.affectedRows === 1) {
        const fin = await productModel.getPostProduct()
        const mapResults = fin.map(o => {
          if (o.image !== null) {
            o.image = `${o.image}`
          }
          return o
        })
        return response(res, 'Product data created!', mapResults[0], 200)
      } else {
        return response(res, 'Unexpected Data', null, 404)
      }
    })
  } catch (e) {
    return response(res, e.message, null, 500)
  }
}

const delProduct = (req, res) => {
  const dataID = parseInt(req.params.id)
  if (isNaN(dataID) === true) {
    return response(res, 'Data ID must be Number', null, 400)
  }
  productModel.getDelProduct(dataID, (result) => {
    productModel.delProduct(dataID, () => {
      if (result.affectedRows !== 1) {
        productModel.delProduct(dataID, () => {
          if (result.length > 0) {
            return response(res, 'Product Success Deleted', result, 200)
          } else {
            return response(res, 'Data Product not Found', null, 404)
          }
        })
      } else {
        return response(res, 'Data Product failed to Delete', null, 500)
      }
    })
  })
}

const patchProduct = (req, res) => {
  try {
    req.fileUpload = 'product'
    upload(req, res, function (err) {
      if (err) {
        return response(res, err.message, null, 400)
      }
      const dataID = parseInt(req.params.id)
      if (isNaN(dataID) === true) {
        return response(res, 'Data ID must be Number', null, 400)
      }
      productModel.getPatchProduct(dataID, (result) => {
        if (result.length >= 1) {
          const data = { }
          // data["discount"] == data.discount
          const fillable = ['name', 'price', 'stock']
          fillable.forEach(field => {
            if (req.body[field]) {
              return (data[field] = req.body[field]) // data.qty = req.body.qty
            }
          })

          if (req.file) {
            const imageTemp = req.file.path
            data.image = imageTemp.replace('\\', '/')
          }

          if (isNaN(data.price) === true && isNaN(data.stock) === true) {
            return response(res, 'Price and Stock must be filled with number!', null, 400)
          }
          if (isNaN(data.price) === true) {
            return response(res, 'ID user must be filled with number!', null, 400)
          }
          if (isNaN(data.stock) === true) {
            return response(res, 'ID vehicles must be filled with number!', null, 400)
          }
          productModel.patchProduct(data, dataID, (result) => {
            if (result.affectedRows === 1) {
              productModel.getPatchProduct(dataID, (fin) => {
                const mapResult = fin.map(o => {
                  if (o.image !== null) {
                    o.image = `${o.image}`
                  }
                  return o
                })
                return response(res, 'Data Product Updated', mapResult[0], 200)
              })
            } else {
              return response(res, 'Data Product not Found with that ID', null, 404)
            }
          })
        } else {
          return response(res, 'Unexpected Data', null, 404)
        }
      })
    })
  } catch (err) {
    return response(res, err.message, null, 500)
  }
}

module.exports = { postProduct, delProduct, patchProduct, dataProduct, detailProduct }
