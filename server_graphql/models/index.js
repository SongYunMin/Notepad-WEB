const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize('notepad', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.User_SESSION = require('./user_session')(sequelize, Sequelize);
db.Notepad = require('./notepad')(sequelize, Sequelize);

db.User.hasOne(db.User_SESSION, {foreignKey: 'user_id', sourceKey: "ID"});
db.User.hasMany(db.Notepad, {foreignKey: 'user_id', sourceKey: "ID"});

module.exports = db;