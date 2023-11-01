var db = require('../config/database');
var crypto = require("crypto");

const userModel = require('../models/user.model');

var register = async (body) => {
    try {
        const existingUser = await userModel.findOne({
            where: {
                u_username: body.username
            }
        });
        if (existingUser) {
            return { "errno" : 1062 };
        } else {
            return await userModel.create({
                "u_username": body.username,
                "u_password": genPassword(body.password)
            });
        }
    } catch (err) {
        // Log the original error
        console.error(err);
        throw new Error(err);
    }
}

function genPassword(password) {
    //var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, "salt", 10000, 64, 'sha512').toString('hex');
    return genHash;
}
module.exports = {
    register,
};