const mongoose = require('mongoose')
// const mensajesMongo = require('../models/mensajes')


class ContenedorMongoDB{    
    constructor(collection){
        this.collection = collection
        //Schema
        let importURL = '../models/'+collection
        const modelMongo = require(importURL)
        this.connection = modelMongo
        const URL = 'mongodb+srv://jherlein:asd@cluster0.hatkx.mongodb.net/proyecto-final-coderhouse?retryWrites=true&w=majority'
        let rta = mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        })
        console.log('Base de datos conectada')
    }

    async insertData(data){
        console.log('Insert')
        const dataInsertedModel = this.connection(data)
        let dataSave = await dataInsertedModel.save()
        console.log(dataSave)
        return dataSave
    }

    async listarAll(){
        console.log('Read')
        const mensajesModel = await this.connection.find({})
        console.log(mensajesModel)
        return mensajesModel       

    }

    async listar(name){
        console.log('Read one')        
        const mensajesModel = await this.connection.findOne({nombre:name})
        console.log(mensajesModel)
        return mensajesModel      

    }

    async update(name,_keyToFind,_values){        
        let mensajeUpdate = await this.connection.updateOne({_keyToFind: name},
        {$set:_values})
        return mensajeUpdate
    }

    async delete(name){
        let mensajeDelete = await this.connection.deleteOne({author:name})
        return mensajeDelete
    }
}

module.exports = ContenedorMongoDB