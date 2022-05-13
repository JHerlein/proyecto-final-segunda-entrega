const fs = require('fs')
const { administrador } = require('../administrador')
const { productoDao } = require('../daos/daos') 


const getAllProducts = async (req,res) => {
    try {    
        const response = await productoDao.listarAll()
        res.status(200).json(response)             
    } catch (error) {
        res.send(error)
    }    
}

const getProduct = async (req,res) => {
    try {        
        const {id:productName} = req.params
        const response = await productoDao.listar(productName)
        res.status(200).json(response)
    } catch (error) {
        res.send(error)
    }   
}

const createProduct = async (req,res) => {
    try {
        if (administrador) {            
            console.log('Producto creado')
            const response = await productoDao.insertData(req.body)
            res.status(200).json(response)            
        }
        else {
            res.status(403).json({error:-1,
                descripcion:"ruta /api/productos/ POST no autorizada"})
        }     
    } catch (error) {
        res.send(error)
    }
}

const editProduct = async (req,res) => {
   try {
        if (administrador) {       
        const {id:productID,toFind} = req.params                
        const values = req.body       
        const response = await productoDao.update(productID,toFind,values)
        res.status(200).json(response) 
        }
        else{
            res.status(403).json({error:-1,
                descripcion:"ruta /api/productos/:id PUT no autorizada"})

        }       
    } catch (error) {
        res.send(error)
    }   
    
}

const deleteProduct = async(req,res) => {
    try {
        if (administrador) {
        const {id:productID} = req.params
        const response = productoDao.delete(productID)        
        res.status(200).json(response)
        }
        else{
            res.status(403).json({error:-1,
                descripcion:"ruta /api/productos/:id DELETE no autorizada"})
        }   
    
    } catch (error) {
        res.send(error)
    }    
    
}


module.exports = {getAllProducts,
                getProduct,
                createProduct,
                editProduct,
                deleteProduct}