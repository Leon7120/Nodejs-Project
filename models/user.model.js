const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const user = sequelize.define('User', {
    UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CreateDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    
}, {
    tableName: 'User'
})

module.exports = user;