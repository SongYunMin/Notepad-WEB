const {ApolloServer} = require('apollo-server-express')
const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const users = require('./typedefs-resolvers/users')
const notepads = require('./typedefs-resolvers/notepads')
const schema = require('./typedefs-resolvers/schema');

const typeDefs = [
    queries,
    mutations,
    schema.typeDefs
]

const resolvers = [
    users.resolvers,
    notepads.resolvers
]

const testServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        const {request: req} = require('express')
        req.headers['authorization'] = `Bearer ${process.env.TEST_TOKEN}`
        return {
            req
        }
    }
})

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {
            req
        }
    }
})

module.exports = {apollo, testServer}