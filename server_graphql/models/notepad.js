module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notepad', {
            number:{
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            memo: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            tab: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            }
        }, {
            timestamps: false
        }
    );
}