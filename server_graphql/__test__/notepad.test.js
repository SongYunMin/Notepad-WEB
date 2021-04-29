const modules = require('./test_setup');
describe("Notepad Test", () => {
    afterAll(async () => {
        await modules.serverDisconnect();
    })

    test("[Integration] Initialize Data Test", async () => {
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

    test("[Integration] Load Notepad Test", async () => {
        const query = modules.gql`
            query loadNotepad($name: String!){
                loadNotepad(name: $name){
                    number
                    name
                    memo
                }
            }
        `
        const variables = {
            name: '송윤민'
        }
        const result = await modules.query({query: query, variables: variables})
        console.log("로드 결과 : ", result.data.loadNotepad)
        expect(result.data.loadNotepad).not.toBeFalsy()
    })

    test("[Integration] Save Notepad Test", async () => {
        const query = modules.gql`
            mutation saveNotepad($name: String, $memo: String, $count: Int, $activeIndex: Int){
                saveNotepad(name: $name, memo: $memo, count: $count, activeIndex: $activeIndex)
            }
        `
        const variables = {
            name: "KnowreKorea",
            memo: "Labs",
            count: 4,
            activeIndex: 4
        }
        const result = await modules.query({query: query, variables: variables});
        console.log("저장 결과 : ", result.data.saveNotepad);
        expect(result.data.saveNotepad).toBeTruthy()
    })

    test("[Integration] Delete Notepad Test", async () => {
        const mutation = modules.gql`
            mutation deleteNotepad($number: Int, $name: String, $count: Int){
                deleteNotepad(number: $number, name: $name, count: $count)
            }
        `
        const variables = {
            number: 4,
            name: 'KnowreKorea',
            count: 3
        }

        const result = await modules.mutate({mutation: mutation, variables: variables});
        console.log("삭제 결과 : ", result.data.deleteNotepad);
        expect(result.data.deleteNotepad).toBeTruthy()
    })
})