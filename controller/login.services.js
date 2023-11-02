const userModel = require('../models/user.model');
const genPassword = require('../utils/utils').genPassword;

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


module.exports = {
    register,
};