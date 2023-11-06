const userModel = require('../models/user.model');
const utils = require('../utils/utils');

var register = async (body) => {
    try {
        const existingUser = await userModel.findOne({
            where: {
                u_username: body.username
            }
        });
        if (existingUser) {
            return { "errno": 1062 };
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

var login = async (body) => {
    try {
        const user = await userModel.findOne({
            where: {
                u_username: body.username
            }
        });
        if (!user || user.length <= 0) {
            return false
        } else {
            const check = utils.validPassword(body.password, user.u_password);
            if (check) {
                return ({ user: user.u_username, token: utils.issueToken(user.u_username) });
            } else {
                return false
            }
        }
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}


module.exports = {
    register,
    login
};