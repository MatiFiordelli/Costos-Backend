import  { MongoClient, ObjectId } from 'mongodb'

export default async function DeleteData(dbName, collectionName, document){
	const url = 'mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

	let mongoClient
	let msg = null

	try {
		mongoClient = new MongoClient(url)
		console.log('Connecting to MongoDB..')
		await mongoClient.connect()
		console.log('Successfully connected')
		const db = mongoClient.db(dbName)
		
        const fieldName = Object.keys(document)[0]
        const fieldValue = Object.values(document)[0]
        
		try{
			db.collection(collectionName).deleteOne({ [fieldName]: new ObjectId(fieldValue) })
			console.log('Deleted record')
			return {status:200, message: 'OK'}
		} catch (error) {
			msg='Ocurrio un error al intentar eliminar el documento'
			console.log(msg)
			return {status:500, message: msg}
		}
	} catch (error) {
		msg='Ocurrio un error al conectarse a la base de datos'
		console.error(msg, error)
		return {status:500, message: msg}
	}
}