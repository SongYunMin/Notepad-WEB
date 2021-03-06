const express = require('express');
const app = express();
const cors = require('cors');
const initRouter = require('./router/init');
const userRouter = require('./router/user');
const notepadRouter = require('./router/notepad');

const { sequelize } = require('./models');
sequelize.sync();

const session = require('express-session');
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));

app.use(express.json());
app.use(express.static('./public'));
app.use('/init', initRouter);
app.use('/user', userRouter);
app.use('/notepad', notepadRouter);

app.get('/', (req, res) => {
    res.redirect('/init');
});

app.listen(3000, () => {
    console.log('Server started!');
});

