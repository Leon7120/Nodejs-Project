const services = require('./login.services');
const { validationResult } = require("express-validator");

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'You Are Not Authorized');
        res.redirect('/v1');
    }
}
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/v1/home')
    } else {
        next();
    }
}
var register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Inputs did not match the format." });
    }
    try {
        services.register(req.body.username, req.body.password, (error, result) => {
            if (error) {
                console.log(error);
                if (error.errno == 1062) {
                    res.status(409)
                        .send({ message: "Try another username" })
                        .end();
                } else {
                    res.status(400)
                        .send({ message: "Try again" })
                        .end();
                }
            } else if (result) {
                res.status(201)
                    .send({ message: "Successfully Registered A New Account!" })
                    .end();
            }
        });
    } catch (error) {
        res.send({ message: "Server Problem" });
        console.log(error);
    }
}

module.exports = {
    isAuthenticated,
    checkAuthenticated,
    register,
};