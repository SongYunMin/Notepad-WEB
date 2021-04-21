const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        idCheck(ID: String): String
        initCheck(ID: String): String
        loadNotepad(name: String): String
        deleteNotepad(name: String, count: Int): String
    }
`

module.exports = typeDefs