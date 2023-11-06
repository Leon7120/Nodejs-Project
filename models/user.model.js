const { DataTypes,Sequelize } = require('sequelize');
const db = require('../config/sequelize');

const user = db.sequelize.define('User', {
    u_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    u_username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    u_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    u_createDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: db.sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    u_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = user;