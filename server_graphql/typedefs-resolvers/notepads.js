const {gql} = require('apollo-server')
const db = require('../models')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

const SECRET_KEY = process.env.SECRET_KEY

const typeDefs = gql`
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

function tokenDecode(token) {
    const decode = jwt.verify(token, SECRET_KEY);
    if (!decode) {
        return null;
    }
    return decode;
}

const resolvers = {
    Query: {
        initCheck: async (parent, args, context) => {
            const {req, res} = context;
            const decode = tokenDecode(req.headers['authorization'].split(' ')[1]);

            if (!decode.ID) return 'False';

            const initUserSessionResult = await db.User_SESSION.findOne({
                where: {user_id: decode.ID}
            });

            const initNotepadResult = await db.Notepad.findAll({
                where: {user_id: decode.ID}
            })

            if (initUserSessionResult === null || initNotepadResult === null) {
                return JSON.stringify({DATA: "DATA_NOT_FOUND"});
            }

            let initData = {
                count: initUserSessionResult.count,
                activeIndex: initUserSessionResult.active,
                notepad: []
            }

            for (const node of initNotepadResult) {
                initData.notepad.push({
                    number: node.number,
                    name: node.name,
                    memo: node.memo,
                    tab: node.tab
                });
            }
            return {
                User_Data: initUserSessionResult.dataValues,
                Notepads: initData.notepad
            }

        },
        loadNotepad: async (parent, args, context) => {
            const {req, res} = context;
            const decode = tokenDecode(req.headers['authorization'].split(' ')[1]);
            if (decode === null) return {name: "TOKEN_NOT_FOUND"}

            try {
                const loadNotepadResult = await db.Notepad.findOne({
                    where: {name: args.name}
                })
                return loadNotepadResult.dataValues;
            } catch(err) {
                return {name : "DATA_NOT_FOUND"}
            }


        }
    },
    Mutation: {
        saveNotepad: async (parent, args, context) => {
            const {req, res} = context
            const decode = tokenDecode(req.headers['authorization'].split(' ')[1]);
            if (decode === null || args.name.indexOf('../') !== -1) return false;

            const USER_SESSION_DATA = {
                user_id: decode.ID,
                count: args.count,
                active: args.activeIndex
            }

            const userSessionResult = await db.User_SESSION.findOne({where: {user_id: decode.ID}});

            console.log(userSessionResult);
            if (userSessionResult === null) {
                db.User_SESSION.create({
                    user_id: USER_SESSION_DATA.user_id,
                    count: USER_SESSION_DATA.count,
                    active: USER_SESSION_DATA.active
                })
            } else {
                db.User_SESSION.update({
                        user_id: USER_SESSION_DATA.user_id,
                        count: USER_SESSION_DATA.count,
                        active: USER_SESSION_DATA.active
                    }, {where: {user_id: USER_SESSION_DATA.user_id}
                })
            }

            const NOTEPAD_DATA = {
                user_id: decode.ID,
                name: args.name,
                memo: args.memo,
                tab: args.activeIndex
            }

            db.Notepad.create({
                user_id: NOTEPAD_DATA.user_id,
                name: NOTEPAD_DATA.name,
                memo: NOTEPAD_DATA.memo,
                tab: NOTEPAD_DATA.tab
            })

            return true;
        },
        // TODO :
        deleteNotepad: async (parent, args, context) => {
            const {req, res} = context
            const decode = tokenDecode(req.headers['authorization'].split(' ')[1]);
            if (decode === null) return false;
            console.log("삭제 인자 : ", args);

            await db.Notepad.destroy({
                // where: {name: args.name}
                where: {
                    [Op.and]: [
                        {name: args.name},
                        {number: args.number}
                    ]
                }
            })
            await db.User_SESSION.update({
                count: args.count,
                active: 0
            }, {where: {user_id: decode.ID}});

            return true;
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}