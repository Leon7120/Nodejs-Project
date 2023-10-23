const { DataTypes } = require('sequelize');
const db = require('../config/sequelize');

const pizza = db.sequelize.define('Pizza', {
    P_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    P_Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    P_Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'Pizza'
})

module.exports = pizza;