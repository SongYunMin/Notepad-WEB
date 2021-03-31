const express = require('express');
const crypto = require('crypto');
const db = require('../models');
const promisify = require('util').promisify;
const router = express.Router();

// const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

router.get('/idCheck', async (req, res) => {
    try {
        const result = await db.User.findAll({attributes: ['ID']});
        for (const node of result) {
            if (node.ID === req.query.id) {
                res.send('False');
                return -1;
            }
        }
        res.send('OK');
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
    res.send('OK');
    return -1;
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
            res.send(node.nickname.toString());
            return 1;
        }
    }
    // // TODO : ERR_HTTP_HEADERS_SENT ERROR
    // res.send('False');
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(err => {
                if (err) {
                    return -1;
                }
                res.send("OK");
                return 1;
            }
        )
    }
});

module.exports = router;