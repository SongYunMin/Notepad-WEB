const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        idCheck(ID: String): String
        initCheck(ID: String): String
        loadNotepad(ID: String, name: String): String
        deleteNotepad(ID: String, name: String, count: Int): String
    }
`

module.exports = typeDefs