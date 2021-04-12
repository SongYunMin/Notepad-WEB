const {gql} = require('apollo-server')
const db = require('../models')
const promisify = require('util').promisify;
const crypto = require('crypto');

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
    input PostNewAccount {
        ID: String!
        pw: String!
        nickname: String!
        salt: String!
    }
`

const resolvers = {
    Query: {
        idCheck: async (parent, args) => {
            try {
                const result = await db.User.findAll({attributes: ['ID']});
                for (const node of result) {
                    console.log(node)
                    if (node.ID === args.ID) {
                        return 'False';
                    }
                }
                return 'OK';
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        newAccount: async (parent, args) =>{
            console.log(args);
            const salt = await crypto.randomBytes(64).toString('base64');
            const scryptPromise = await promisify(crypto.scrypt);
            const key = await scryptPromise(args.input.pw, salt, 64);
            if (key) {
                db.User.create({
                    ID: args.input.ID,
                    password: key.toString('base64'),
                    nickname: args.input.nickname,
                    salt: salt
                }).catch(err => {
                    return err
                });
            }
            return 'OK';
        },
        login: async (parent, args, context) => {
            const result = await db.User.findAll({attributes: ['ID', 'password', 'nickname', 'salt']});
            const scryptPromise = promisify(crypto.scrypt);
            for (const node of result) {
                const key = await scryptPromise(args.pw, node.salt, 64);
                if (key && node.ID === args.id && node.password === key.toString('base64')) {
                    if (!context.session.user) {
                        context.session.user = {
                            id: args.id,
                            pw: key.toString('base64'),
                            authorization: true
                        }
                        console.log(context.session.user);
                    }
                    return node.nickname.toString();
                }
            }
            return 'False';
        },
        logout: (parent, args, context) => {
            if (context.session.user) {
                context.session.destroy(err => {
                        if (err) {
                            return err;
                        }
                        return 'OK';
                    }
                )
            }
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}