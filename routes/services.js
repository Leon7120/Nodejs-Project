var db = require('../config/database');
var crypto = require("crypto");

var login = (username, password) => {

    return new Promise((resolve, reject) => {
        query = "SELECT * FROM users WHERE u_username = ?";
        db.query(query, username, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                var hashPassword = data[0].u_password;
                if (data.length > 0 && validPassword(password,hashPassword) && (data[0].u_username === username)) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}
var isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        throw Error("You are not Authorized");
    }
}
var createUser = (username, password) => {

    let query = "INSERT INTO users (u_id,u_username,u_password,u_createDate,u_status) VALUES (uuid(),?,?,now(),default)";

    var hashPassword = genPassword(password);

    db.query(query, [username,hashPassword], (error, result) => {
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
function validPassword(password,hashPassword){
    var verifyHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return hashPassword === verifyHash;
}
var getAll = () => {
    let query = "select * from pizza";
    return new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });

}

var createPizza = (category, price) => {

    let query = "insert Pizza(PizzaId,Category,Price) VALUES (default,?)";
    let value = [category, price];

    db.query(query, [value], (error, result) => {
        if (error) {
            throw Error("insert error");
        } else {
            if (result.affectedRows == 1) {
                return result;
            }
        }
    })
}

var deletePizza = (id) => {

    return new Promise((resolve, reject) => {
        const deleteId = id;
        const query = "delete from pizza where PizzaId = ?";

        db.query(query, deleteId, (error, result) => {
            if (error) {
                reject(error);

            } else {

                if (result.affectedRows == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })


}

var updatePizza = (id, category, price) => {

    return new Promise((resolve, reject) => {
        const updateId = id;
        const updateCategory = category;
        const updatePrice = price;

        let query = "update pizza set category = ? , price = ? where pizzaId = ?";

        db.query(query, [updateCategory, updatePrice, updateId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                if (result.affectedRows == 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })

}

var getOnePizza = (id) => {

    return new Promise((resolve, reject) => {
        const getId = id;
        let query = "select * from pizza where PizzaId = ?";

        db.query(query, getId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })


}
module.exports = {
    login,
    isAuthenticated,
    createUser,
    getAll,
    createPizza,
    deletePizza,
    updatePizza,
    getOnePizza
};