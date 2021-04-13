const {gql} = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        newAccount(ID: String, pw: String, nickname: String): String!
        login(id: String, pw: String): String!
        logout: String
        saveNotepad (name: String, memo: String, count: Int, activeIndex: Int): String!
    }
`

module.exports = typeDefs