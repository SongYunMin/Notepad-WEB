const {gql} = require('apollo-server')
const db = require('../models')

const typeDefs = gql`
    type Notepad {
        number: Int!
        user_id: String!
        name: String
        memo: String
        tab: Int!
    }
 `

const resolvers = {
    Query: {
        initCheck: async(parent, context) => {
            console.log("노트패드 세션 : ", context.req.session)

            // console.log("init::::", context.req.session)
            // if (context.req.session.user) {       // 사용자 데이터(Session)가 있다면
            //     console.log("Session...OK");
            // } else {                      // 세션이 없는데 Notepad 접근 시
            //     console.log(context.req.session.user);
            //     return 'False';
            // }
            //
            // const initUserSessionResult = await db.User_SESSION.findOne({
            //     where: {user_id: context.req.session.user.id}
            // });
            // console.log(initUserSessionResult)
            //
            // const initNotepadResult = await db.Notepad.findAll({
            //     where: {user_id: context.req.session.user.id}
            // })
            // console.log(initNotepadResult)
            //
            //
            // if(initUserSessionResult === null || initNotepadResult === null){
            //     return {DATA : "DATA_NOT_FOUND"};
            // }
            //
            // let initData = {
            //     count: initUserSessionResult.count,
            //     activeIndex: initUserSessionResult.active,
            //     notepad: []
            // }
            //
            // for (const node of initNotepadResult) {
            //     initData.notepad.push({
            //         name: node.name,
            //         memo: node.memo,
            //         index: node.tab
            //     });
            // }
            // return JSON.stringify(initData);
        }
    },
    Mutation: {
        saveNotepad: async (parent, args, context, info) => {
            if (args.name.indexOf('../') !== -1) {
                return res.send('Unable to access.');
            }

            if (!context.session.user) {
                return res.send('False');
            }

            const USER_SESSION_DATA = {
                user_id: context.session.user.id,
                count: args.count,
                active: args.activeIndex
            }

            const userSessionResult = await db.User_SESSION.findOne({where: {user_id: req.session.user.id}});
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
                user_id: context.session.user.id,
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