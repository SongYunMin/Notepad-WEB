const {gql} = require('apollo-server-express')
const db = require('../models')
const promisify = require('util').promisify;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY;

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
`

const resolvers = {
    Query: {
        idCheck: async (parent, args) => {
            try {
                const result = await db.User.findAll({attributes: ['ID']});
                for (const node of result) {
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
        newAccount: async (parent, args) => {
            const salt = await crypto.randomBytes(64).toString('base64');
            const scryptPromise = await promisify(crypto.scrypt);
            const key = await scryptPromise(args.pw, salt, 64);
            if (key) {
                db.User.create({
                    ID: args.ID,
                    password: key.toString('base64'),
                    nickname: args.nickname,
                    salt: salt
                }).catch(err => {
                    return err
                });
            }
            return 'OK';
        },
        // TODO : Session - File - Store 에서 값을 가져오면?
        login: async (parent, args, context) => {
            const {req, res} = context
            const result = await db.User.findAll({attributes: ['ID', 'password', 'nickname', 'salt']});
            const scryptPromise = promisify(crypto.scrypt);
            for (const node of result) {
                const key = await scryptPromise(args.pw, node.salt, 64);
                if (key && node.ID === args.id && node.password === key.toString('base64')) {
                    const token = jwt.sign({
                        ID: args.id
                    }, SECRET_KEY, {
                        expiresIn: 6000
                    });
                    // req.headers['authorization'] = token;
                    // console.log("헤더 : ", req.headers);
                    res.cookie('token', token);

                    return node.nickname.toString();
                }
            }
            return 'False';
        },
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}