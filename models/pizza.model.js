const { DataTypes } = require('sequelize');
const db = require('../config/sequelize');

const pizza = db.sequelize.define('Pizza', {
    pizza_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pizza_category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pizza_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'Pizza'
})
pizza.sync({ alter: true });


module.exports = pizza;