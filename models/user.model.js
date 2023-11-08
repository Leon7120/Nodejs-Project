const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/sequelize');

const user = db.sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user_username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'User',
    timestamps: true,
    createdAt: 'user_createDate',
    updatedAt: false,
});
user.sync({ alter: true });

module.exports = user;