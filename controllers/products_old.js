const fs = require('fs')
const { administrador } = require('../administrador')



const getAllProducts = async (req,res) => {
    try {
                     
        let file = await fs.promises.readFile('./files/products.txt')
        file = new Array(file)
        res.status(200).json(JSON.parse(file))             
    } catch (error) {
        res.send(error)
    }    
}

const getProduct = async (req,res) => {
    try {
        const {id:productID} = req.params
        let file = await fs.promises.readFile('./files/products.txt')
        file = JSON.parse(new Array(file))               
        let idFiltered = file.filter(function(entry){   
            return entry.id==productID            
        })        
        if (idFiltered.length != 0){
            res.status(200).json(idFiltered)            
        }
        else{
            res.json({error:"producto no encontrado"})
        }
        

    } catch (error) {
        res.send(error)
    }   
}

const createProduct = async (req,res) => {   
    
    try {
        if (administrador) {
            let file = await fs.promises.readFile('./files/products.txt','utf-8')
            file = JSON.parse(file)
            newId = file.length + 1
            console.log(req.body)
            const newProduct = req.body
            newProduct.id = newId
            newProduct.timestamp = new Date()
            file.push(newProduct)
            console.log(newProduct)
            await fs.promises.writeFile('./files/products.txt',JSON.stringify(file,null,2))
            res.status(200).json(newProduct)            
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
        const {id:productID} = req.params
        const {nombre,
               descripcion,
               codigo,
               foto,
               precio,
               stock} = req.body
        console.log(req.body)
        console.log(req.params)
        let file = await fs.promises.readFile('./files/products.txt')
        file = JSON.parse(new Array(file))

        for (i = 0; i < file.length; i++){            
            if (file[i].id == productID){
                file[i].nombre = nombre               
                file[i].descripcion = descripcion
                file[i].codigo = codigo
                file[i].foto = foto
                file[i].precio = precio
                file[i].stock = stock
            }
        }

        let idFiltered = file.filter(function(entry){   
            return entry.id==productID            
        })

        await fs.promises.writeFile('./files/products.txt',JSON.stringify(file,null,2))

        res.status(200).json(idFiltered) 
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
        let jsonArray = await fs.promises.readFile('./files/products.txt','utf-8')
        jsonArray = JSON.parse(jsonArray);        
        jsonArray = jsonArray.filter(function(entry){   
            return entry.id!=productID            
        })             
        fs.promises.writeFile('./files/products.txt',JSON.stringify(jsonArray,null,2))
        res.json(jsonArray)
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