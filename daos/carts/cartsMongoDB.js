let ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB')

class CartsMongoDB extends ContenedorMongoDB{
    constructor(){
        super('carts')
    }
}

module.exports = CartsMongoDB