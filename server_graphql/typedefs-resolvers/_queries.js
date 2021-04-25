const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        idCheck(
            ID: String!
        ): Boolean!
        login(
            id: String!, 
            pw: String!
        ): Boolean!
        
        initCheck(
            ID: String
        ): InitData
        
        init(
            ID: String
        ): InitData!
        
        loadNotepad(
            name: String!
        ): Notepad
    }
`

module.exports = typeDefs