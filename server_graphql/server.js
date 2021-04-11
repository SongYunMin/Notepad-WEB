const express = require('express');
const app = express();
const cors = require('cors');
const initRouter = require('./router/init');
const userRouter = require('./router/user');
const notepadRouter = require('./router/notepad');
const {graphqlHTTP} = require('express-graphql');
const graphql = require('graphql');

const schema = graphql.buildSchema(`
  # 데이터 구조 정의 (스키마)
  type User {
    id: String
    name: String
  }
  
  # 쿼리에 사용할 메소드를 정의
  type Query {
    users: [User]
  }
`);
// 데이터 자체를 정의 함
const users = [
    {
        id: '1',
        name: 'Elizabeth Bennet'
    },
    {
        id: '2',
        name: 'Fitzwilliam Darcy'
    }
];
const rootValue = {
    Query: {
        users: (parent, args, context, info) => users.find(user => user.id === args.id)
    }
}
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphql: true
}))

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

