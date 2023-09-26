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
    res.json(await GetData(dbName, 'Ingredients', false))
})

app.get('/ingredients/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', `${req.params._id}`))
})

app.get('/recipes', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', false))
})

app.get('/recipes/:_id', async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', `${req.params._id}`))
})

app.listen(port || 3001, ()=>console.log('server online'))