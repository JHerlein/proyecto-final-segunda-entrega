const mongoose = require('mongoose')

const productosCollection = 'productos';

const ProductoSchema = new mongoose.Schema({    
    timestamp:{type: Date, default:Date.now},
    nombre:{type:String,require:true,max:100},
    descripcion:{type:String,require:true,max:100},
    codigo:{type:String,require:true,max:15},
    foto:{type:String,require:true,max:100},
    precio:{type:Number,require:true},
    stock:{type:Number,require:true}
})

const productosMongo = mongoose.model(productosCollection, ProductoSchema)
module.exports = productosMongo
