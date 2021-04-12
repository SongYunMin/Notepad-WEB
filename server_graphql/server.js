const {ApolloServer} = require('apollo-server')
const cors = require('cors')
const express = require('express')
const app = express()
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const user_sessions = require('./typedefs-resolvers/user_sessions')
const notepads = require('./typedefs-resolvers/notepads')
const {sequelize} = require('./models')

const session = require('express-session');
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

const typeDefs = [
    queries,
    mutations,
    users.typeDefs,
    user_sessions.typeDefs,
    notepads.typeDefs
]

const resolvers = [
    users.resolvers,
    user_sessions.resolvers,
    notepads.resolvers
]

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server ready ay ${url}`)
})