const { DataTypes } = require('sequelize');
const db = require('../config/sequelize');

const pizza = db.sequelize.define('Pizza', {
    PizzaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'Pizza'
})

module.exports = pizza;