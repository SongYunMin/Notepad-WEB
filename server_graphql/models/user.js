module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        ID: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(580),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        salt:{
            type:DataTypes.STRING(100),
            allowNull:false
        }
    }, {
        timestamps: false
    });
}