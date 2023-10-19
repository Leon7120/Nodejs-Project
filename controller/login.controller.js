
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
        return res.status(400).json({ messsage: "Something wrong" });
    }
    try {
        if (services.register(req.body.username, req.body.password)) {
            res.status(201)
                .send("<h1>Sucessfully Registered A New Account</h1> <br> <a href ='/v1'>Back to Login</a>")
                .end();
        }else{
            res.status(401)
            .send({"message" : "something wrong!"})
            .end(); 
        }
    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }
}

module.exports = {
    isAuthenticated,
    checkAuthenticated,
    register,
};