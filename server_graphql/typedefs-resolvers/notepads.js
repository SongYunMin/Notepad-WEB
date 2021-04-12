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
            if (context.session.user) {       // 사용자 데이터(Session)가 있다면
                console.log("Session...OK");
            } else {                      // 세션이 없는데 Notepad 접근 시
                console.log(context.session.user);
                return 'False';
            }

            const initUserSessionResult = await db.User_SESSION.findOne({
                where: {user_id: context.session.user.id}
            });
            console.log(initUserSessionResult)

            const initNotepadResult = await db.Notepad.findAll({
                where: {user_id: context.session.user.id}
            })
            console.log(initNotepadResult)


            if(initUserSessionResult === null || initNotepadResult === null){
                return {DATA : "DATA_NOT_FOUND"};
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
        }
    },
    Mutation: {

    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}