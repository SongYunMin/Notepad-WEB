const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        res.redirect('/Notepad.html');
    } else {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
});

module.exports = router;