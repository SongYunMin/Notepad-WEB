const notepad = require('../typedefs-resolvers/tst')

test("Save Notepad Unit Test", () => {
    expect(notepad.test(3, 7)).toBe(10)
})

// test('JWT Token Check', () => {
//     expect()
// })