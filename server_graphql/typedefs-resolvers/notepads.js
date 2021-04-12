const {gql} = require('apollo-server')
const db = require('../models')

const typeDefs = gql`
    type Notepad {
        number: Int!
        user_id: String!
        name: String
        memo: String
        tab: Int!
    }
 `

const resolvers = {
    Query: {
        test: (parent, args) => {
            return "Test Query"
        }
    },
    Mutation: {
        test_mutation: (parent, args) => {
            return "Test Query"
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}