import  { MongoClient } from 'mongodb'

export default async function GetData(dbName, collectionName){
     const url = "mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

     let mongoClient
     try {
          mongoClient = new MongoClient(url)
          console.log('Connecting to MongoDB..')
          await mongoClient.connect()
          console.log('Successfully connected')
          const db = mongoClient.db(dbName)
          const collection = db.collection(collectionName)
          const info = collection.find({}).toArray()
          return await info
     
     } catch (error) {
          console.error('Connection to MongoDB was failed!', error)
          process.exit()
     } finally {
          await mongoClient.close()
     }
}