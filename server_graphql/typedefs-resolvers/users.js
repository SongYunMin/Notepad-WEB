const {gql} = require('apollo-server-express')
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
            const {req} = context
            console.log(req)
            const result = await db.User.findAll({attributes: ['ID', 'password', 'nickname', 'salt']});
            const scryptPromise = promisify(crypto.scrypt);
            for (const node of result) {
                const key = await scryptPromise(args.pw, node.salt, 64);
                if (key && node.ID === args.id && node.password === key.toString('base64')) {
                    if (!req.session.cookie.id) {
                        req.session.cookie.id = args.id;
                        req.session.cookie.pw = key.toString('base64');
                    }
                    req.session.save(function(err){
                        console.log("로그인 : ", req.session)
                        console.log("리턴 값 : ", node.nickname.toString());
                        return node.nickname.toString();
                    });

                }
            }
            return 'False';
        },
        logout: (parent, args, context) => {
            const {req} = context
            console.log("로그아웃 : ", req.session)
            if (req.session.cookie.id) {
                req.session.destroy(err => {
                        if (err) {
                            console.log("Session Delete Error!");
                            return err;
                        }
                        console.log("Session Delete Success");
                        return 'OK';
                    }
                )
            }
            console.log("세션 존재하지 않음");
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}