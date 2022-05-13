require('dotenv').config()
const express = require('express');
const app = express();
const routerProduct = require('./routes/products')
const routerCart = require('./routes/carts')

const mongoose = require('mongoose')
const CartsMongoDB = require('./daos/carts/cartsMongoDB')
const ProductosMongoDB = require('./daos/productos/productosMongoDB')
const CartsFirebase = require('./daos/carts/cartsFirebase')
const ProductosFirebase = require('./daos/productos/productosFirebase')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/productos',routerProduct)
app.use('/api/carrito',routerCart)
app.use(express.static('./public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.listen(process.env.PORT,console.log(`Listening on port ${process.env.PORT}`))

app.get('/products',(req,res) => {    
    res.render('products.html')
})