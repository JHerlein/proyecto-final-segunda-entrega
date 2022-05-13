let ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class ProductosFirebase extends ContenedorFirebase{
    constructor(){
        super('productos')
    }
}

module.exports = ProductosFirebase