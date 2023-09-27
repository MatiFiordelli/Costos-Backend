import express from 'express'
import cors from 'cors'
import GetData from './mongoData.js'

const app = express()
app.use(cors())
const port = process.env.port
const dbName = 'CostosSite'

app.get('/', (req, res)=>{
    res.send('Welcome')
})

app.get('/ingredients', async (req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', false, false))
})

app.get('/ingredients/_id/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', '_id', `${req.params._id}`))
})

app.get('/ingredients/ingrediente/:ingrediente', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'ingrediente', `${req.params.ingrediente}`))
})

app.get('/ingredients/marca/:marca', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'marca', `${req.params.marca}`))
})

app.get('/ingredients/categoria/:categoria', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'categoria', `${req.params.categoria}`))
})


app.get('/recipes', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', false, false))
})

app.get('/recipes/_id/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', '_id', `${req.params._id}`))
})

app.get('/recipes/nombre/:nombre', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'nombre', `${req.params.nombre}`))
})

app.get('/recipes/categoria/:categoria', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'categoria', `${req.params.categoria}`))
})

app.get('/recipes/receta/ingrediente/:ingrediente', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'ingrediente', `${req.params.ingrediente}`))
})

app.listen(port || 3001, ()=>console.log('server online'))