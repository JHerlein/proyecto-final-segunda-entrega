const ProductosMongoDB = require('./productos/productosMongoDB')
const CartsMongoDB = require('./carts/cartsMongoDB')
const ProductosFirebase = require('./productos/productosFirebase')
const CartsFirebase = require('./carts/cartsFirebase')
require('dotenv').config()


let productoDao 
let carritoDao

switch(process.env.DB){
    case 'mongodb': 
        productoDao = new ProductosMongoDB()
        carritoDao = new CartsMongoDB()
        break
    
    default:
        productoDao = new ProductosFirebase()
        carritoDao = new CartsFirebase()
        break      
}

module.exports = {productoDao, carritoDao}
