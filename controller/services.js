var db = require('../config/database');
const pizzaModel = require('../models/pizza.model');
var crypto = require("crypto");
const sequelize = require("sequelize");
const Op = sequelize.Op;

// var login = (username, password) => {

//     return new Promise((resolve, reject) => {
//         query = "SELECT * FROM users WHERE u_username = ?";
//         db.query(query, username, (error, data) => {
//             if (error) {
//                 reject(error);
//             }
//             if (data.length === 1 && (data[0].u_username === username)) {
//                 let hashPassword = data[0].u_password;
//                 if (validPassword(password, hashPassword)) {
//                     resolve(true);
//                 }
//                 resolve(false);
//             }
//         })
//     })
// }
var register = (username, password) => {

    let query = "INSERT INTO users (u_id,u_username,u_password,u_createDate,u_status) VALUES (uuid(),?,?,CURDATE(),default)";

    var hashPassword = genPassword(password);

    db.query(query, [username, hashPassword], (error, result) => {
        if (error) {
            throw Error(error);
        } else {
            if (result.affectedRows == 1) {
                return result;
            }
        }
    })
}
function genPassword(password) {
    //var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return genHash;
}
function validPassword(password, hashPassword) {
    var verifyHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return hashPassword === verifyHash;
}


const getAllPizza = async () => {
    try {
        const pizza = await pizzaModel.findAll()
        if (!pizza) {
            return false;
        } else {
            return pizza;
        }
    } catch (err) {
        throw Error(err);
    }
}
const getSpecificPizza = async (query) => {
    const whereParameter = {};
    try {
        if (query.id || query.category || query.price) {
            whereParameter[Op.and] = [];
            if (query.id) {
                whereParameter[Op.and].push({
                    pizzaId: { [Op.like]: query.id }
                })
            }
            if (query.category) {
                whereParameter[Op.and].push({
                    category: { [Op.like]: query.category }
                })
            }
            if (query.price) {
                whereParameter[Op.and].push({
                    price: { [Op.like]: query.price }
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
        throw Error(err);
    }
}
const getOnePizza = async (id) => {
    try {
        const pizza = await pizzaModel.findOne({
            where: { pizzaId: id }
        })
        if (!pizza) {
            return false;
        } else {
            return pizza;
        }
    } catch (err) {
        throw Error(err);
    }
}
var createPizza = async (body) => {
    try {
        return await pizzaModel.create({
            "PizzaId": body.pizzaId,
            "Category": body.category,
            "Price": body.price
        });
    } catch (err) {
        throw Error(err);
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
        const result = await pizzaModel.destroy({ where: { pizzaId: id } })
        if (!result || result == 0) {
            return false
        } else {
            return true
        }
    } catch (err) {
        throw new Error(err);
    }
}
var updatePizza = async (id, reqCategory, reqPrice) => {
    try {
        const pizza = await pizzaModel.findByPk(id)
        if (!pizza) {
            return false
        }
        pizza.Category = reqCategory;
        pizza.Price = reqPrice;
        await pizza.save();
        return true
    } catch (error) {
        throw Error(error);
    }
}


module.exports = {
    // login,
    register,
    getAllPizza,
    getOnePizza,
    getSpecificPizza,
    createPizza,
    deletePizza,
    updatePizza,
};