const modules = require('./test_setup')
const endpoint = 'http://localhost:3000/graphql'
const jwt = require('jsonwebtoken')
require('dotenv').config();

function getToken() {
    return process.env.TEST_TOKEN;
}
modules.server.apollo.context = () => ({bearerToken: `Bearer ${process.env.TEST_TOKEN}`})
console.log("유저 토큰 : ", process.env.TEST_TOKEN);

describe("New Account Test", () =>{
    afterAll(async () => {
        console.log("서버 연결 해제");
        await modules.serverDisconnect();
    })
    test("[Integration] ID Duplicate Test", async () => {
        const query = modules.gql`
            query idCheck($ID: String!){
                idCheck(ID: $ID)
            }
        `
        const variables = {
            ID: '1234'
        }

        const result = await modules.query({query: query, variables: variables});
        console.log("아이디 체크 : ", result.data.idCheck);
        expect(result.data.idCheck).toBeFalsy();

    })

    test("[Integration] NewAccount Request Test", async () => {
        const mutation =  modules.gql`
            mutation newAccount($ID: String, $pw: String, $nickname: String){
                newAccount(ID: $ID, pw: $pw, nickname: $nickname)
            }
        `
        const variables = {
            ID: '321',
            pw: '234',
            nickname: 'knowre',
        }
        // TODO : 테스트 결과가 왜 다르지..?
        const result = await modules.mutate({mutation: mutation, variables: variables});
        console.log("회원가입 결과 : ", result.data.newAccount);
        expect(result.data.newAccount).toBeTruthy();
    })

    test("[Integration] Login Request Test", async ()=> {
        const USER = {id: '1234', pw: '1234'};
        const SECRET_KEY = process.env.SECRET_KEY;
        const query = modules.gql`
            query login($id: String!, $pw: String!){
                login(id: $id, pw:$pw)
            }
        `
        const variables = {
            id: USER.id,
            pw: USER.pw
        }
        const result = await modules.query({query: query, variables: variables});
        process.env.TEST_TOKEN = jwt.sign({ID: USER.id}, SECRET_KEY);
        console.log("프로세스 토큰 : ", process.env.TEST_TOKEN);
        const token = jwt.sign({ID: USER.id}, SECRET_KEY);
        console.log("로그인 결과 : ", result.data.login);
        expect(result.data.login).toEqual(token);

    })
})

// module.exports = token