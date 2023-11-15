import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import GetData from './getData.js'
import SetData from './setData.js'
import DeleteData from './deleteData.js'
import UpdateData from './updateData.js'
import { authenticateToken } from './middlewares/index.js'

const app = express()
app.use(cors(
    {
        allowedHeaders: ["authorization", "Content-Type"], 
        exposedHeaders: ["authorization"], 
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false
      }
))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.port || 3001
const dbName = 'CostosSite'

app.get('/', (req, res)=>{
    res.send('Welcome')
})

app.get('/ingredients', authenticateToken, async (req, res)=>{
    res.json(await GetData(dbName, 'Ingredients', 'autor', req.body.autor))
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

app.post('/addingredient/', authenticateToken, async(req, res)=>{
    const returnedData = await SetData(dbName, 'Ingredients', req.body)
    res.status(returnedData.status).json({message: returnedData.message})
})

app.post('/deleteingredient/', authenticateToken, async(req, res)=>{
    const returnedData = await DeleteData(dbName, 'Ingredients', req.body)
    res.status(returnedData.status).json({message: returnedData.message})
})

app.post('/updateingredients/', authenticateToken, async(req, res)=>{
    const returnedData = await UpdateData(dbName, 'Ingredients', req.body)
    res.status(returnedData.status).json({message: returnedData.message})
})



app.get('/recipes', authenticateToken, async(req, res)=>{
    res.json(await GetData(dbName, 'Recipes', 'autor', req.body.autor))
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

app.post('/addrecipe/', authenticateToken, async(req, res)=>{
    const returnedData = await SetData(dbName, 'Recipes', req.body)
    res.status(returnedData.status).json({message: returnedData.message})    
})

app.post('/deleterecipe/', authenticateToken, async(req, res)=>{
    const returnedData = await DeleteData(dbName, 'Recipes', req.body)
    res.status(returnedData.status).json({message: returnedData.message})
})

app.post('/updaterecipe/', authenticateToken, async(req, res)=>{
    const returnedData = await UpdateData(dbName, 'Recipes', req.body)
    res.status(returnedData.status).json({message: returnedData.message})
})

app.post('/login', async(req, res)=>{
    //const salt = await bcrypt.genSalt()
    //const password = await bcrypt.hash(req.body.password, salt)

    const emailReq = req.body.email
    const passwordReq = req.body.password
    const secret = process.env.SECRET_FOR_TOKEN

    const result = await GetData(dbName, 'Users', 'email', emailReq)
    if(result){
        const auth = await bcrypt.compare(passwordReq, result.password)
        if(auth){
            const token = jwt.sign({email: emailReq, user: result.user}, secret, { expiresIn: '7d' })
            res.status(200).json({message: '', token: token, user: result.user})
            console.log('Sesion iniciada satisfactoriamente')
        } else{
            res.status(401).json({message: 'password incorrecto'})
        } 
    }else{
        res.status(401).json({message: 'email no encontrado'})
    }    
})

app.listen(port, ()=>console.log('server online'))