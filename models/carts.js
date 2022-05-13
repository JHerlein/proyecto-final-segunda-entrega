const mongoose = require('mongoose')

const cartsCollection = 'carts';

const CartsSchema = new mongoose.Schema({   
    timestamp:{type: Date, default:Date.now},
    productos:{type: Array, require:true}
})

const cartsMongo = mongoose.model(cartsCollection, CartsSchema)
module.exports = cartsMongo

// {
//     "id": 1,
//     "timestamp": 123,
//     "productos": [
//       {
//         "id": 1,
//         "timestamp": 123,
//         "nombre": "Plato",
//         "descripcion": "Un plato",
//         "codigo": "PL",
//         "foto": "foto",
//         "precio": 150,
//         "stock": 2
//       },
//       {
//         "id": 1,
//         "timestamp": 123,
//         "nombre": "Plato",
//         "descripcion": "Un plato",
//         "codigo": "PL",
//         "foto": "foto",
//         "precio": 150,
//         "stock": 2
//       }
//     ]
//   }