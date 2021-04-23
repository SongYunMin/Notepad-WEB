const {gql} = require('apollo-server')
const db = require('../models')
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

const typeDefs = gql`
    type Notepad {
        number: Int!
        user_id: String!
        name: String
        memo: String
        tab: Int!
    }
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
            const decode = tokenDecode(req.cookies.token);
            if (decode === null) return res.status(401).text('Unauthorized');
            if (decode.ID) {       // 사용자 데이터(Session)가 있다면
                console.log("Session...OK");
            } else {                      // 세션이 없는데 Notepad 접근 시
                return 'False';
            }

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
                    name: node.name,
                    memo: node.memo,
                    index: node.tab
                });
            }
            return JSON.stringify(initData);
        },
        // TODO : ERR_HTTP_HEADERS_SENT
        loadNotepad: async(parent, args, context) => {
            const {req, res} = context;
            const decode = tokenDecode(req.cookies.token);
            if (decode === null) return res.status(401).json({error: 'Unauthorized'});

            const loadNotepadResult = await db.Notepad.findOne({
                where: {name: args.name}
            })

            return JSON.stringify(loadNotepadResult.dataValues);
        },
        // TODO : 여기도 load와 같은 문제 있음 (ERR_HTTP_HEADERS_SENT)
        deleteNotepad: async (parent, args, context) => {
            const {req, res} = context
            const decode = tokenDecode(req.cookies.token);
            if (decode === null) return res.status(401).json({error: 'Unauthorized'});

            await db.Notepad.findOne({
                where: {name: args.name}
            })
            await db.Notepad.destroy({
                where: {name: args.name}
            })
            await db.User_SESSION.update({
                count: args.count,
                active: 0
            }, {where: {user_id: decode.ID}});

            return 'OK';
        }
    },
    Mutation: {
        saveNotepad: async (parent, args, context) => {
            const {req, res} = context
            const decode = tokenDecode(req.cookies.token);
            if (decode === null) return res.status(401).json({error: 'Unauthorized'});

            if (args.name.indexOf('../') !== -1) {
                return res.send('Unable to access.');
            }
            if (decode.ID === null) {
                return res.send('False');
            }

            const USER_SESSION_DATA = {
                user_id: decode.ID,
                count: args.count,
                active: args.activeIndex
            }

            console.log("유저 데이터 : ", USER_SESSION_DATA)

            const userSessionResult = await db.User_SESSION.findOne({where: {user_id: decode.ID}});
            if (userSessionResult === null) {
                db.User_SESSION.create({
                    user_id: USER_SESSION_DATA.user_id,
                    count: USER_SESSION_DATA.count,
                    active: USER_SESSION_DATA.active
                }).catch(err => {
                    throw err;
                });
            } else {
                db.User_SESSION.update({
                        user_id: USER_SESSION_DATA.user_id,
                        count: USER_SESSION_DATA.count,
                        active: USER_SESSION_DATA.active
                    }, {where: {user_id: USER_SESSION_DATA.user_id}}
                ).catch(err => {
                    throw err;
                })
            }

            const NOTEPAD_DATA = {
                user_id: decode.ID,
                name: args.name,
                memo: args.memo,
                tab: args.activeIndex
            }

            // TODO : DATA UPDATE
            db.Notepad.create({
                user_id: NOTEPAD_DATA.user_id,
                name: NOTEPAD_DATA.name,
                memo: NOTEPAD_DATA.memo,
                tab: NOTEPAD_DATA.tab
            }).catch(err => {
                throw err;
            });

            return 'OK';
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}