const {gql} = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        newAccount(input: PostNewAccount): String!
        login(id: String, pw: String): String!
        logout: String
    }
`

module.exports = typeDefs