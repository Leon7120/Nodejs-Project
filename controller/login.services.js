var db = require('../config/database');
var crypto = require("crypto");
const sequelize = require("sequelize");
const Op = sequelize.Op;

var register = (username, password, callback) => {
    let query = "INSERT INTO User VALUES (uuid(),?,?,NOW(),default)";
    var hashPassword = genPassword(password);
    db.query(query, [username, hashPassword], (error, result) => {
        if (error) {
            callback(error);
        } else {
            if (result.affectedRows == 1) {
                callback(null, result);
            } else {
                console.log(result);
                callback(new Error('Insert operation failed'));
            }
        }
    });
}

function genPassword(password) {
    //var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return genHash;
}
module.exports = {
    register,
};