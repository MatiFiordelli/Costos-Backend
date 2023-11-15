import  { MongoClient, ObjectId } from 'mongodb'

export default async function DeleteData(dbName, collectionName, document){
	const url = 'mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

	let mongoClient
	let msg = null
	let successfullyUpdated = []

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
				
				if(collectionName==='Ingredients'){
					console.log(`Records modified successfully on: (( ${doc.ingrediente} ))`)
					successfullyUpdated.push(doc.ingrediente)
				}else{
					console.log(`Records modified successfully on: (( ${doc.nombre} ))`)
				}
				
			} catch (error) {
				if(collectionName==='Ingredients'){
					msg=`Solo algunos documentos pudieron ser modificados, el proceso se detuvo al encontrar un error en: ${doc.ingrediente}`
				}else{
					msg=`Error, no se pudo modificar el documento`
				}
				console.log(msg)
				return {status:500, message: msg}
			}
		}
		
        if(collectionName === 'Recipes') {
			updateDoc(document['codigo'], document)
			return {status:200, message: 'OK'}
		}
		if(collectionName === 'Ingredients') {
			const ud = document.map((e,i)=>{
				return updateDoc(e['_id'], e)
			})
			return Promise.all(ud).then(()=>{return {status:200, message: 'OK'}})			
		}

	} catch (error) {
		if(successfullyUpdated.length>0) msg=`Ocurrio un error al conectarse a la base de datos, pero lograron modificarse los siguientes documentos: ${[...successfullyUpdated]}`
		else msg='Ocurrio un error al conectarse a la base de datos'
		successfullyUpdated.length=0
		console.error(msg, error)
		return {status:500, message: msg}
	}
}