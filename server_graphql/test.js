const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config()

console.log(process.env.SECRET)


const YOUR_SECRET_KEY = process.env.SECRET_KEY;

app.get('/test', (req, res) => {
    console.log(req.cookies.user);
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

