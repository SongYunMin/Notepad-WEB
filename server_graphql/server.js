const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const app = express()
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const cookieParser = require('cookie-parser')

const corsOption = {
    origin: 'http://localhost:8080',
    credentials: true
}
app.use(cookieParser());

const typeDefs = [
    queries,
    mutations,
    users.typeDefs,
    notepads.typeDefs
]

const resolvers = [
    users.resolvers,
    notepads.resolvers
]

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => {
        return {
            req, res
        }
    }
})

server.applyMiddleware({
    app,
    cors: corsOption
})

app.listen(3000, () => {
    console.log("server start!");
})

