const pizzaModel = require('../models/pizza.model');
const sequelize = require("sequelize");
const Op = sequelize.Op;

const getAllPizza = async () => {
    try {
        const pizza = await pizzaModel.findAll();
        if (!pizza) {
            return false;
        } else {
            return pizza;
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
                    P_Category: { [Op.like]: query.category }
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
            return pizza;
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
            return pizza;
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
    // let query = "insert into Pizza(PizzaId,Category,Price) VALUES (default,?)";
    // let value = [category, price];

    // db.query(query, [value], (error, result) => {
    //     if (error) {
    //         throw Error(error);
    //     } else {
    //         if (result.affectedRows == 1) {
    //             return true;
    //         }
    //     }
    // })
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
    } catch (error) {
        throw new Error(error);
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