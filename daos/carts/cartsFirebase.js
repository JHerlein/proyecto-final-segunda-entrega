let ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

class CartsFirebase extends ContenedorFirebase{
    constructor(){
        super('carts')
    }
}

module.exports = CartsFirebase