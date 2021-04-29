const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const app = express()
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const cookieParser = require('cookie-parser')
const port = 3000

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

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({bearerToken: req.headers["authorization"]})
})

apollo.applyMiddleware({
    app,
    cors: corsOption
})

const connect = app.listen(port, () => {
    console.log("server start");
})

const disconnect = () => {
    connect.close();
}

module.exports = {apollo, app, disconnect}