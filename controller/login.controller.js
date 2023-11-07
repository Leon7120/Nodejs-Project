const services = require('./login.services');
const { validationResult } = require("express-validator");

var register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Inputs did not match the format." });
    }
    try {
        let result = await services.register(req.body);
        if (result && result.errno == 1062) {
            res.status(409)
                .send({ message: "Try another username" })
                .end();
        } else if (result) {
            res.status(201)
                .send({ message: "Successfully Registered A New Account!" })
                .end();
        }
    } catch (error) {
        res.send({ message: "Server Problem" });
        console.log(error);
    }
}

var login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Inputs did not match the format." });
    }
    try {
        let result = await services.login(req.body);
        if (result) {
            res.setHeader("authorization", result.token);
            // res.redirect("/v1/home");
            res.send({ status: 301, url: "/home" });
        } else {
            res.send({ message: "Invalid Username Or Password" });
        }
    } catch (error) {
        res.send({ message: "Server Problem" });
    }
}

module.exports = {
    register,
    login
};