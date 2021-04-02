const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/check', async (req, res) => {
    console.log("세션", req.session);
    if (req.session.user) {       // 사용자 데이터(Session)가 있다면
        console.log("Session...OK");
    } else {                      // 세션이 없는데 Notepad 접근 시
        console.log(req.session.user);
        return res.send('False');
    }

    const initUserSessionResult = await db.User_SESSION.findOne({
        where: {user_id: req.session.user.id}
    });

    const initNotepadResult = await db.Notepad.findAll({
        where: {user_id: req.session.user.id}
    })


    if(initUserSessionResult === null || initNotepadResult === null){
        return res.send({DATA : "DATA_NOT_FOUND"});
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
    res.send(initData);
    // return 1;
});

router.post('/save-notepad_SQL.sql', async (req, res) => {
    if (req.body.name.indexOf('../') !== -1) {
        return res.send("Unable to access.");
    }

    if (!req.session.user) {
        return res.send("False");
    }

    const USER_SESSION_DATA = {
        user_id: req.session.user.id,
        count: req.body.count,
        active: req.body.activeIndex
    }

    const userSessionResult = await db.User_SESSION.findOne({where: {user_id: req.session.user.id}});
    if (userSessionResult === null) {
        db.User_SESSION.create({
            user_id: USER_SESSION_DATA.user_id,
            count: USER_SESSION_DATA.count,
            active: USER_SESSION_DATA.active
        }).catch(err => {
            throw err;
        });
    } else {
        db.User_SESSION.update({
                user_id: USER_SESSION_DATA.user_id,
                count: USER_SESSION_DATA.count,
                active: USER_SESSION_DATA.active
            }, {where: {user_id: USER_SESSION_DATA.user_id}}
        ).catch(err => {
            throw err;
        })
    }

    const NOTEPAD_DATA = {
        user_id: req.session.user.id,
        name: req.body.name,
        memo: req.body.memo,
        tab: req.body.activeIndex
    }

    db.Notepad.create({
        user_id: NOTEPAD_DATA.user_id,
        name: NOTEPAD_DATA.name,
        memo: NOTEPAD_DATA.memo,
        tab: NOTEPAD_DATA.tab
    }).catch(err => {
        throw err;
    });

    res.send('OK');
    return 1;
});

router.get('/load', async (req, res) => {
    if (!req.session.user) {
        return res.send("False");

    }
    const loadNotepadResult = await db.Notepad.findOne({
        where: {name: req.query.name}
    });

    res.send({
        name: loadNotepadResult.name,
        memo: loadNotepadResult.memo
    });
});

router.get('/delete', (req, res) => {
    const newData = JSON.parse(req.query.data);
    db.Notepad.destroy({
        where: {name: newData.notepad.name}
    })

    db.User_SESSION.update({
        count: newData.count,
        active: 0
    }, {where:{user_id:req.session.user.id}});

    res.send({result : 'OK'});
});

module.exports = router;