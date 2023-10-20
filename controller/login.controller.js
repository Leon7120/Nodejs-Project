
const services = require('./login.services');
const { validationResult } = require("express-validator");

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({ message: 'You Are Not Authorized' });
    }
}
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/home')
    } else {
        next();
    }
}
var register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ messsage: "Inputs did not match the format." });
    }
    try {
        services.register(req.body.username, req.body.password, (error, result) => {
            if (error) {
                console.log(error);
                res.status(409)
                    .send(error)
                    .end();
            } else {
                res.status(201)
                    .send("Sucessfully Registered A New Account")
                    .end();
            }
        });
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

module.exports = {
    isAuthenticated,
    checkAuthenticated,
    register,
};