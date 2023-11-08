const userModel = require('../models/user.model');
const utils = require('../utils/utils');

var register = async (body) => {
    try {
        const existingUser = await userModel.findOne({
            where: {
                user_username: body.username
            }
        });
        if (existingUser) {
            return { "errno": 1062 };
        } else {
            return await userModel.create({
                "user_username": body.username,
                "user_password": utils.genPassword(body.password)
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
                user_username: body.username
            }
        });
        if (!user || user.length <= 0) {
            return false
        } else {
            const check = utils.validPassword(body.password, user.user_password);
            if (check) {
                return ({ user: user.user_username, token: utils.issueToken(user.user_username) });
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