const {gql} = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        newAccount(ID: String, pw: String, nickname: String): Boolean!

        saveNotepad (name: String, memo: String, count: Int, activeIndex: Int): Boolean!
        deleteNotepad(name: String, count: Int): Boolean!
    }
`

module.exports = typeDefs