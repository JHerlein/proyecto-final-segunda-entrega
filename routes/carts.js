const express = require('express')
const router = require('../../entrega-6/routes/products')
const routerCart = express.Router()

const {getCart,
createCart,
deleteCart,
addProductToCart,
deleteProductInCart
} = require('../controllers/carts')


routerCart.route('/').post(createCart)
routerCart.route('/:id').delete(deleteCart)
routerCart.route('/:id/productos').get(getCart)
routerCart.route('/:id/productos/:id_prod').delete(deleteProductInCart).post(addProductToCart)


module.exports = routerCart