const users = require('../typedefs-resolvers/users')
const testModule = require('./test_setup')
const endpoint = 'http://localhost:3000/graphql'

describe("Login Unit Test", () =>{
    test("ID CHECK", async () => {
        const query = testModule.gql`
            query idCheck($ID: String!){
                idCheck(ID: $ID)
            }
        `
        const variables = {
            ID: '1234'
        }
        const result = await testModule.request(endpoint, query, variables);
        expect(result.idCheck).toBe(false)
    })

    // test("Save Notepad Unit Test", () => {
    //     expect(notepad.test(3, 7)).toBe(10)
    // })

})

// test('JWT Token Check', () => {
//     expect()
// })