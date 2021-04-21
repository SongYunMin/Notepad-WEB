const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
require('dotenv').config()

console.log(process.env.SECRET)

const YOUR_SECRET_KEY = process.env.SECRET;

app.get('/test', (req, res) => {
    const token = jwt.sign({
            user_id: '4321'
        },
        YOUR_SECRET_KEY,
        {
            expiresIn: '5'
        }
    )

    res.cookie('user', token);
    res.send("끝!");
})

app.listen(3500, ()=>{
    console.log("Server Start!");
})

