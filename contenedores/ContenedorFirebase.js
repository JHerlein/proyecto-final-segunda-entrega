var admin = require("firebase-admin");

var serviceAccount = require("../db/segunda-entrega-e6022-firebase-adminsdk-lte4h-19a5830041.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ''
  });

class ContenedorFirebase{
    constructor(collection){        
        console.log('Base firebase conectada')
        this.db = admin.firestore()        
        this.query = this.db.collection(collection)
    }

    async insertData(document){
        try {
          const newID = ((await this.listarAll()).length) + 1 
          console.log(newID)         
          let doc = this.query.doc(`${newID}`)
          await doc.create(document)          
          console.log('Dato insertado')
          return document
        } catch (error) {
          console.log(error)
        }
      }

    async listar(id) {
        try {
          const doc = await this.query.doc(id).get()
          if (!doc.exists) {
            throw new Error(`Error al listar por id: no se encontró`)
          } else {
            const data = doc.data()
            return { ...data, id }
          }
        } catch (error) {
          throw new Error(`Error al listar por id: ${error}`)
        }
      }

    async listarAll() {
        try {
          const result = []
          const snapshot = await this.query.get()
          snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() })
          })
          return result
        } catch (error) {
          throw new Error(`Error al listar todo: ${error}`)
        }
      }
    
    async update(id,_keyToFind,newValue){
        try {
            const doc = this.query.doc(`${id}`)
            let item = await doc.update(newValue)
            console.log(`Se actualizo el registro ${id}`)
            return item        
        } catch (error) {
            console.log(error)            
        }        
    }

    async delete(id){
        try {
            const doc = this.query.doc(`${id}`)
            let item = await doc.delete()
            console.log(`Se eliminó el registro ${id}`)
            return item
        
        } catch (error) {
            console.log(error)            
        }    

    }
}


module.exports = ContenedorFirebase