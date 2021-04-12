const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query{
        idCheck(ID: String): String
        initCheck: String
    }
`

module.exports = typeDefs