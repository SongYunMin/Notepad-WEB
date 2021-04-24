const {gql} = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        newAccount(pw: String, nickname: String): String!
        login(id: String, pw: String): String!
        saveNotepad (name: String, memo: String, count: Int, activeIndex: Int): String
        deleteNotepad(name: String, count: Int): String
    }
`

module.exports = typeDefs