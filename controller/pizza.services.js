const pizzaModel = require('../models/pizza.model');
const sequelize = require("sequelize");
const Op = sequelize.Op;

function transformArray(data) {
    return data.map(item => ({
        id: item.pizza_id,
        category: item.pizza_category,
        price: item.pizza_price
    }));
}
function transformObject(data) {
    return {
        id: data.pizza_id,
        category: data.pizza_category,
        price: data.pizza_price
    };
}

const getAllPizza = async (limit, offset) => {
    try {
        const { count, rows } = await pizzaModel.findAndCountAll({
            limit : limit,
            offset : offset
        });
        if (!rows) {
            return false;
        } else {
            return { count: count, data: transformArray (rows)};
        }
    } catch (err) {
        throw new Error(err);
    }
}
const getSpecificPizza = async (query, limit, offset) => {
    const whereParameter = {};
    try {
        if (query.id || query.category || query.price) {
            whereParameter[Op.and] = [];
            if (query.id) {
                whereParameter[Op.and].push({
                    pizza_id: { [Op.like]: query.id }
                })
            }
            if (query.category) {
                whereParameter[Op.and].push({
                    pizza_category: { [Op.like]: `%${query.category}%` }
                })
            }
            if (query.price) {
                whereParameter[Op.and].push({
                    pizza_price: { [Op.like]: query.price }
                })
            }
        }
        const { count, rows } = await pizzaModel.findAndCountAll(
            {
                where: whereParameter,
                limit: limit,
                offset: offset,
            })
        if (!rows.length) {
            return false;
        } else {
            return { count: count, data: transformArray(rows) };
        }
    } catch (err) {
        throw new Error(err);
    }
}
const getOnePizza = async (id) => {
    try {
        const pizza = await pizzaModel.findOne({
            where: { pizza_id: id }
        })
        if (!pizza) {
            return false;
        } else {
            return transformObject(pizza);
        }
    } catch (err) {
        throw new Error(err);
    }
}
var createPizza = async (body) => {
    try {
        return await pizzaModel.create({
            "pizza_id": body.id,
            "pizza_category": body.category,
            "pizza_price": body.price
        });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            throw new Error('Duplicate entry detected: Try another id or category please.');
        } else {
            throw new Error(err);
        }
    }
}

var deletePizza = async (id) => {
    try {
        const result = await pizzaModel.destroy({ where: { pizza_id: id } })
        if (!result || result == 0) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        throw new Error(err);
    }
}
var updatePizza = async (id, category, price) => {
    try {
        const pizza = await pizzaModel.findByPk(id)
        if (!pizza) {
            return false
        }
        pizza.pizza_category = category;
        pizza.pizza_price = price;
        await pizza.save();
        return true;
    } catch (err) {
        throw new Error(err);
    }
}
module.exports = {
    getAllPizza,
    getOnePizza,
    getSpecificPizza,
    createPizza,
    deletePizza,
    updatePizza,
};