const express = require('express');
const routerProduct = express.Router();

const {getAllProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
} = require('../controllers/products')


routerProduct.route('/').get(getAllProducts).post(createProduct)
routerProduct.route('/:id').get(getProduct).delete(deleteProduct)
routerProduct.route('/:id/:toFind').put(editProduct)

module.exports = routerProduct