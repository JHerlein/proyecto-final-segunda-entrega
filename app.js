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

// const port = 8080

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

// connectionFirebaseProductos = new ProductosFirebase()
// connectionFirebaseMensajes = new MensajesFirebase()


// connectionMongoCarts = new CartsMongoDB()
// connectionMongoProductos = new ProductosMongoDB()
// connectionFirebaseCarts = new CartsFirebase()
// connectionFirebaseProductos = new ProductosFirebase()
// connectionMongoCarts.listarAll()
// connectionMongoProductos.listarAll()
// newData = {    
//     timestamp: new Date(),
//     productos: [
//       {
//         id: 2,
//         timestamp: 123,
//         nombre: "Cuchillo",
//         descripcion: "Cuchillo",
//         codigo: "CU",
//         foto: "foto",
//         precio: 150,
//         stock: 2
//       },
//       {
//         id: 1,
//         timestamp: 123,
//         nombre: "Plato",
//         descripcion: "Un plato",
//         codigo: "PL",
//         foto: "foto",
//         precio: 150,
//         stock: 2
//       }
//     ]
//   }
// connectionFirebaseCarts.create(newData)

// connectionFirebaseMensajes.listarAll().then(result => {
//     console.log(result)
// })

// connectionFirebaseProductos.listarAll().then(result => {
//     console.log(result)
// })

// const db = PROCESS.ENV.TIPO_DB || 'mongodb'


