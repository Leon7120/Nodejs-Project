
const services = require('./services');
const { validationResult } = require("express-validator");

var isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ message: 'You Are Not Authorized' });
    }
}
// var login = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ messsage: "Something wrong" });
//     }
//     let username = req.body.username;
//     let password = req.body.password;
//     let returnUsername = await services.login(username, password);
//     if (returnUsername) {
//         req.session.regenerate(function (error) {
//             if (error) {
//                 res.status(400)
//                     .send({ message: " Something wrong" })
//                     .end();
//             }
//             req.session.user = username;
//             res.redirect('/v1/home')
//         });
//     } else {
//         res.status(400)
//             .send({ message: "Something wrong with username or password!" })
//             .end();
//     }
// }
var logout = (req, res, next) => {
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.redirect('/v1');
}
var register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ messsage: "Something wrong" });
    }
    username = req.body.username;
    password = req.body.password;

    try {
        services.register(username, password);
        res.status(201)
            .send("<h1>Sucessfully Registered A New Account</h1> <br> <a href ='/v1'>Back to Login</a>")
            .end();
    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }
}

module.exports = {
    // login,
    isAuthenticated,
    logout,
    register,
};