const express = require('express');
const crypto = require('crypto');
const db = require('../models');
const promisify = require('util').promisify;
const router = express.Router();

router.get('/idCheck', async (req, res) => {
    try {
        const result = await db.User.findAll({attributes: ['ID']});
        for (const node of result) {
            if (node.ID === req.query.id) {
               return res.send('False');
            }
        }
        return res.send('OK');
    } catch (err) {
        throw err;
    }
});

router.post('/newAccount', async (req, res) => {
    const salt = await crypto.randomBytes(64).toString('base64');
    const scryptPromise = promisify(crypto.scrypt);
    const key = await scryptPromise(req.body.pw, salt, 64);
    if (key) {
        db.User.create({
            ID: req.body.id,
            password: key.toString('base64'),
            nickname: req.body.nick,
            salt: salt
        }).catch(err => {
            throw err
        });
    }
    return res.send('OK');
});

router.post('/login', async (req, res) => {
    const result = await db.User.findAll({attributes: ['ID', 'password', 'nickname', 'salt']});
    const scryptPromise = promisify(crypto.scrypt);
    for (const node of result) {
        const key = await scryptPromise(req.body.pw, node.salt, 64);
        if (key && node.ID === req.body.id && node.password === key.toString('base64')) {
            if (!req.session.user) {
                req.session.user = {
                    id: req.body.id,
                    pw: key.toString('base64'),
                    authorization: true
                }
                console.log(req.session.user);
             }
            return res.send(node.nickname.toString());
        }
    }
    return res.send('False');
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
                if (err) {
                    return res.send(err);
                }
                return res.send("OK");
            }
        )
    }
});

module.exports = router;