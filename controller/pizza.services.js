const pizzaModel = require('../models/pizza.model');
const sequelize = require("sequelize");
const Op = sequelize.Op;

function transformArray(data) {
    return data.map(item => ({
        id: item.P_Id,
        category: item.P_Category,
        price: item.P_Price
    }));
}
function transformObject(data) {
    return {
        id: data.P_Id,
        category: data.P_Category,
        price: data.P_Price
    };
}

const getAllPizza = async () => {
    try {
        const pizza = await pizzaModel.findAll();
        if (!pizza) {
            return false;
        } else {
            return transformArray(pizza);
        }
    } catch (err) {
        throw new Error(err);
    }
}
const getSpecificPizza = async (query) => {
    const whereParameter = {};
    try {
        if (query.id || query.category || query.price) {
            whereParameter[Op.and] = [];
            if (query.id) {
                whereParameter[Op.and].push({
                    P_Id: { [Op.like]: query.id }
                })
            }
            if (query.category) {
                whereParameter[Op.and].push({
                    P_Category: { [Op.like]: `%${query.category}%` }
                })
            }
            if (query.price) {
                whereParameter[Op.and].push({
                    P_Price: { [Op.like]: query.price }
                })
            }
        }
        const pizza = await pizzaModel.findAll(
            {
                where:
                    whereParameter
            })
        if (pizza.length == 0 || pizza == null) {
            return false;
        } else {
            return transformArray(pizza);
        }
    } catch (err) {
        throw new Error(err);
    }
}
const getOnePizza = async (id) => {
    try {
        const pizza = await pizzaModel.findOne({
            where: { P_Id: id }
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
            "P_Id": body.id,
            "P_Category": body.category,
            "P_Price": body.price
        });
    } catch (err) {
        throw new Error(err);
    }
}

var deletePizza = async (id) => {
    try {
        const result = await pizzaModel.destroy({ where: { P_Id: id } })
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
        pizza.P_Category = category;
        pizza.P_Price = price;
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