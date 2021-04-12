const {gql} = require('apollo-server')
const db = require('../models')

const typeDefs = gql`
    type User {
        ID: String!
        password: String!
        nickname: String!
        salt: String!
    }
`

const resolvers = {
    Query: {
        test: (parent, args) => {
            console.log("Test Query");
        }
    },
    Mutation: {
        test_mutation: (parent, args) => {
            console.log("Test Mutation")
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}