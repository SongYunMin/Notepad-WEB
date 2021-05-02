const {gql} = require('apollo-server')

const typeDefs = gql`
    type User {
        ID: String!
        pw: String!
        nickname: String!
        salt: String!
    }
    type User_Session {
        user_id: String!
        count: Int!
        active: Int!
    }
    type Notepad {
        number: Int!
        user_id: String!
        name: String
        memo: String
        tab: Int!
    },

    type InitData {
        User_Data: User_Session,
        Notepads: [Notepad]
    },
`

module.exports = {typeDefs: typeDefs}