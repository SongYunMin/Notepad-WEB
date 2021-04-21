const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const app = express()
const cors = require('cors')
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const cookieParser = require('cookie-parser')
app.use(cookieParser());

const {AuthenticationError} = require("apollo-server-errors");

const corsOption = {
    origin: 'http://localhost:8080',
    credentials: true
}

// app.use(cors(corsOption));
// app.use(session({
//     httpOnly: false,
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     store: new MemoryStore(),
//     cookie:{
//         maxAge: 1
//     }
// }));

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
    context: ({req, res}) => ({req, res})
})

// TODO : 여기에 있는 CORS 확인
server.applyMiddleware({
    app,
    cors: corsOption
})

app.listen(3000, () => {
    console.log("server start!");
})

