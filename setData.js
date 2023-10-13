import  { MongoClient } from 'mongodb'

export default async function SetData(dbName, collectionName, document){
	const url = 'mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

	let mongoClient
	try {
		mongoClient = new MongoClient(url)
		console.log('Connecting to MongoDB..')
		await mongoClient.connect()
		console.log('Successfully connected')
		const db = mongoClient.db(dbName)
		
		db.collection(collectionName).insertOne(document, (error, res) => {
			if(error) {
				console.log('Error occurred while inserting')
			} else {
			   	console.log('inserted record')
			}
			mongoClient.close()
		})
	} catch (error) {
		console.error('Connection to MongoDB was failed!', error)
		mongoClient.close()
	}
}