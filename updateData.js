import  { MongoClient, ObjectId } from 'mongodb'

export default async function DeleteData(dbName, collectionName, document){
	const url = 'mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

	let mongoClient
	try {
		mongoClient = new MongoClient(url)
		console.log('Connecting to MongoDB..')
		await mongoClient.connect()
		console.log('Successfully connected')
		const db = mongoClient.db(dbName)

		const updateDoc = (fieldValue, doc) => {
			try{
				if(collectionName==='Ingredients') delete doc._id
					
				db.collection(collectionName).updateOne(
					{ '_id': new ObjectId(fieldValue) },
					{ '$set': doc }
				)
			} catch (err) {
				console.log(err)
			}
		}
		
        if(collectionName === 'Recipes') {
			updateDoc(document['codigo'], document)
		}
		if(collectionName === 'Ingredients') {
			document.forEach((e)=>{
				updateDoc(e['_id'], e)
			})			
		}

	} catch (error) {
		console.error('Connection to MongoDB was failed!', error)
		mongoClient.close()
	}
}