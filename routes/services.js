var db = require('../config/database');
var crypto = require("crypto");

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

    let query = "insert into Pizza(PizzaId,Category,Price) VALUES (default,?)";
    let value = [category, price];

    db.query(query, [value], (error, result) => {
        if (error) {
            throw Error(error);
        } else {
            if (result.affectedRows == 1) {
                return true;
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

        let query = "update pizza set category = ? , price = ? where pizzaId = ?";

        db.query(query, [category, price, id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                console.log(result.affectedRows);
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
   // login,
    register,
    getAll,
    createPizza,
    deletePizza,
    updatePizza,
    getOnePizza
};