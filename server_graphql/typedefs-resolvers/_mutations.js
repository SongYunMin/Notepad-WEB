const {gql} = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        test_mutation(id: Int): User
    }
`

module.exports = typeDefs