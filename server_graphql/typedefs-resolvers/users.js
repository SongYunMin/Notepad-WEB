const db = require('../models')
const promisify = require('util').promisify;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;



const resolvers = {
    Query: {
        idCheck: async (parent, args) => {
            try {
                const result = await db.User.findAll({attributes: ['ID']});
                for (const node of result) {
                    if (node.ID === args.ID) {
                        return false;
                    }
                }
                return true;
            } catch (err) {
                throw err;
            }
        },
        login: async (parent, args) => {
            const result = await db.User.findAll({attributes: ['ID', 'password', 'nickname', 'salt']});
            const scryptPromise = promisify(crypto.scrypt);
            for (const node of result) {
                const key = await scryptPromise(args.pw, node.salt, 64);
                if (key && node.ID === args.id && node.password === key.toString('base64')) {
                    const token = jwt.sign({ID:args.id}, SECRET_KEY)
                    process.env.TEST_TOKEN = token;
                    return token;
                }
            }
            return 'False';
        },
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
                }).catch(()=>{return false})
            }
            return true;
        },
    }
}

module.exports = {
    resolvers: resolvers
}