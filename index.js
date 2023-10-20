import express from 'express'
import cors from 'cors'
import GetData from './getData.js'
import SetData from './setData.js'
import DeleteData from './deleteData.js'
import UpdateData from './updateData.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.port
const dbName = 'CostosSite'

app.get('/', (req, res)=>{
    res.send('Welcome')
    res.status(200).send('OK')
})

app.get('/ingredients', async (req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', false, false))
    res.status(200).send('OK')
})

app.get('/ingredients/_id/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', '_id', `${req.params._id}`))
    res.status(200).send('OK')
})

app.get('/ingredients/ingrediente/:ingrediente', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'ingrediente', `${req.params.ingrediente}`))
    res.status(200).send('OK')
})

app.get('/ingredients/marca/:marca', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'marca', `${req.params.marca}`))
    res.status(200).send('OK')
})

app.get('/ingredients/categoria/:categoria', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'categoria', `${req.params.categoria}`))
    res.status(200).send('OK')
})

app.post('/addingredient/', async(req, res)=>{
    await SetData(dbName, 'Ingredients', req.body)
    res.status(200).send('OK')
})

app.post('/deleteingredient/', async(req, res)=>{
    await DeleteData(dbName, 'Ingredients', req.body)
    res.status(200).send('OK')
})

app.post('/updateingredients/', async(req, res)=>{
    await UpdateData(dbName, 'Ingredients', req.body)
    res.status(200).send('OK')
    /* try{
        await UpdateData(dbName, 'Ingredients', req.body)
    }
    catch{
        res.status(410)
    }
    finally{
        res.status(200)
    } */
})



app.get('/recipes', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', false, false))
    res.status(200).send('OK')
})

app.get('/recipes/_id/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', '_id', `${req.params._id}`))
    res.status(200).send('OK')
})

app.get('/recipes/nombre/:nombre', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'nombre', `${req.params.nombre}`))
    res.status(200).send('OK')
})

app.get('/recipes/categoria/:categoria', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'categoria', `${req.params.categoria}`))
    res.status(200).send('OK')
})

app.get('/recipes/receta/ingrediente/:ingrediente', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'ingrediente', `${req.params.ingrediente}`))
    res.status(200).send('OK')
})

app.post('/addrecipe/', async(req, res)=>{
    await SetData(dbName, 'Recipes', req.body)
    res.status(200).send('OK')
})

app.post('/deleterecipe/', async(req, res)=>{
    await DeleteData(dbName, 'Recipes', req.body)
    res.status(200).send('OK')
})

app.post('/updaterecipe/', async(req, res)=>{
    await UpdateData(dbName, 'Recipes', req.body)
    res.status(200).send('OK')
})

app.listen(port || 3001, ()=>console.log('server online'))