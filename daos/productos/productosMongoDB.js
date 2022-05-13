let ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB')

class ProductosMongoDB extends ContenedorMongoDB{
    constructor(){
        super('productos')
    }
}

module.exports = ProductosMongoDB