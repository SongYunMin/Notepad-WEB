const {gql} = require('apollo-server')
const db = require('../models')

const typeDefs = gql`
    type User_Session {
        user_id: String!
        count: Int!
        active: Int!
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