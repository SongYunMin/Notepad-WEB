const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        idCheck(ID: String): Boolean
        initCheck(ID: String): String
        loadNotepad(name: String): String

    }
`

module.exports = typeDefs