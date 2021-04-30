const path = require('path');

const snapshot = async (title) => {
    await page.screenshot({
        path: path.join(__dirname, 'screenshot', `${ title }.jpg`),
        fullPage: true,
        type: 'jpeg'
    });
};
module.exports = { snapshot };