const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const app = express()
const cors = require('cors')
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const {sequelize} = require('./models')
const session = require('express-session');

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
    cookie: {
        id: '',
        pw: '',
        maxAge: 60000
    },

}));


const server = new ApolloServer({
    cors: {
        origin: '*'
    },
    typeDefs,
    resolvers,
    introspection: true,
    context: ({req}) =>{
        console.log("테스트 : ", req.request)
        return {
            req,
        }
    }
})


server.applyMiddleware({
    app
})

app.listen(3000, () => {
    console.log("server start!");
})