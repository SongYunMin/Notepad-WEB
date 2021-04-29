const modules = require('./test_setup');

describe("Notepad Test", () => {
    afterAll(async () => {
        await modules.serverDisconnect();
    })
    test("[Integration] Initialize Data Test", async () => {
        // TODO : 토큰 정보 보내야 함
        const query = modules.gql`
            query initCheck($ID: String) {
                initCheck(ID: $ID){
                    User_Data{
                        count
                        active
                    }
                    Notepads{
                        number
                        name
                        memo
                        tab
                    }
                }
            }
        `
        const variables = {
            ID: 'secret'
        }

        const result = await modules.query({query: query, variables: variables});
        console.log("초기화 결과 : ", result.data.initCheck);
        expect(result.data.initCheck).not.toEqual(null)
    })
})