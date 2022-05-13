const fs = require('fs')
const administrador = require('../administrador')

const getCart = async (req,res) => {
    try {
        if (administrador){        
            const {id:cartId} = req.params        
            let file = await fs.promises.readFile('./files/carts.txt')
            file = JSON.parse(new Array(file))                      
            let idFiltered = file.filter(function(entry){   
                return entry.id==cartId            
            })              
            if (idFiltered.length != 0){                    
                res.status(200).json(idFiltered[0].productos)
            }
            else{
                res.json({error:"carrito no encontrado"})
            }
        }
        else{
            res.status(403).json({error:-1,
                                  descripcion:"ruta /api/carrito/:id/productos GET no autorizada"})
        }
        
    } catch (error) {
        res.send(error)
    }   
}

const createCart = async (req,res) => {   
    
    try {
        if(administrador){
            let file = await fs.promises.readFile('./files/carts.txt','utf-8')
            file = JSON.parse(file)
            newId = file.length + 1
            let newCart = {id:"",
                            productos:{}}
            newCart.id = newId
            file.push(newCart)        
            await fs.promises.writeFile('./files/carts.txt',JSON.stringify(file,null,2))
            res.status(200).json({id:newId})       
        }
        else{
            res.status(403).json({error:-1,
                descripcion:"ruta /api/carrito POST no autorizada"})
        }   
    } catch (error) {
        res.send(error)
    } 

    
}

const deleteCart = async(req,res) => {
    try {
        const {id:cartId} = req.params
        let jsonArray = await fs.promises.readFile('./files/carts.txt','utf-8')
        jsonArray = JSON.parse(jsonArray);        
        jsonArray = jsonArray.filter(function(entry){   
            return entry.id!=cartId            
        })             
        fs.promises.writeFile('./files/carts.txt',JSON.stringify(jsonArray,null,2))
        res.json(jsonArray)   
    
    } catch (error) {
        res.send(error)
    }    
    
}

const addProductToCart = async (req,res) => {
    try {
        const {id:cartId,id_prod:productId} = req.params
        let file = await fs.promises.readFile('./files/carts.txt')
        file = JSON.parse(new Array(file))
                      
        let idFiltered_cart = file.filter(function(entry){   
            return entry.id==cartId            
        })
        

        let file_productos = await fs.promises.readFile('./files/products.txt')
        
        file_productos = JSON.parse(new Array(file_productos))               
        
        let idFiltered_productos = file_productos.filter(function(entry){   
        return entry.id==productId            
        })
        
        if (idFiltered_cart.length != 0){            
            productsArray = idFiltered_cart[0].productos
            productsArray.push(idFiltered_productos[0])
            idFiltered_cart.productos = productsArray
            for(let i = 0; i < file.length; i++){
                if(file[i].id == cartId){
                    file[i].productos = productsArray
                }
            }
            fs.promises.writeFile('./files/carts.txt',JSON.stringify(file,null,2))            
            res.status(200).json(idFiltered_cart.productos)
        }
        else{
            res.json({error:"producto no encontrado"})
        }
        

    } catch (error) {
        res.send(error)
    }   
}

const deleteProductInCart = async (req,res) => {

    try {
         const {id:cartId,id_prod:productId} = req.params         
         let file = await fs.promises.readFile('./files/carts.txt')
         file = JSON.parse(new Array(file))

         for (let i = 0; i < file.length; i++){
             if (file[i].id == cartId){
                let idProductFiltered = file[i].productos.filter(function(entry){   
                    return entry.id!=productId            
                })
                file[i].productos = idProductFiltered
             }
         }
         
         
         let idFiltered = file.filter(function(entry){   
             return entry.id==cartId            
         })
 
         await fs.promises.writeFile('./files/carts.txt',JSON.stringify(file,null,2))
 
         res.status(200).json(idFiltered)        
     } catch (error) {
         res.send(error)
     }   
     
 }

module.exports = {getCart,
                createCart,
                deleteCart,
                addProductToCart,
                deleteProductInCart}