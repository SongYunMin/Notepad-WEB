module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_session', {
        user_id: {
            type: DataTypes.STRING(30),
            allowNull: false,
            primaryKey: true
        },
        count: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        timestamps: false
    });
}