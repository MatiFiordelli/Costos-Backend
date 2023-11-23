import cors from 'cors'
import express from 'express'
import http from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const httpServer = http.createServer(app)

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

await server.start()

app.options('/graphql', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.status(200)
})

app.use('/graphql', expressMiddleware(server, {
    context: async ({req}) => ({ token: req.headers.authorization }) 
}))

await new Promise((res)=>{
    httpServer.listen({port:4000 || process.env.port}, res)
})
console.log('🚀 Server ready!')