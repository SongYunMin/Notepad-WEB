const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const app = express()
const cors = require('cors')
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

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

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        maxAge: 60000
    },
}));

const server = new ApolloServer({
    cors: {
        origin: '*',
        credentials: true,
    },
    typeDefs,
    resolvers,
    introspection: true,
    context: ({req}) => ({req})
})

server.applyMiddleware({
    app,
    path: "/graphql", cors: false
})

app.listen(3000, () => {
    console.log("server start!");
})

module.exports = MemoryStore