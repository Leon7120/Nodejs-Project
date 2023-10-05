
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
            .send("<h1>Sucessfully Registered A New Account</h1> <br> <a href ='/v1'>Back to Login</a>" )
            .end();
    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }

}
var getAll = async (req, res) => {
    try {
        

        var getAll = await services.getAll();
        res.status(200)
            .send({ data: getAll });


    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }
}
var createPizza = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    category = req.body.category;
    price = req.body.price;

    try {
        services.createPizza(category, price);
        res.status(201)
            .send({ message: "Sucessfully Created A New Pizza" });
    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }

}
var deletePizza = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ Error: "Something is Wrong" });
    }

    id = req.params.id;

    try {
        if (await services.deletePizza(id)) {
            res.status(200)
                .send({ message: "Successfully Deleted A Pizza" });
        } else {
            res.status(204)
        }


    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }
}
var updatePizza = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    id = req.params.id;
    category = req.body.category;
    price = req.body.price;

    try {
        let check = await services.updatePizza(id, category, price);
        if (check) {
            res.status(200)
                .send({ message: "Sucessfully Updated A Pizza" });
        } else {
            res.status(400);
            res.end();
        }

    } catch (error) {
        res.status(error?.status || 500)
            .send({
                status: "FAILED", data: { error: error?.message || error }
            })
    }
}
var getOnePizza = async (req, res) => {

    if (!req.params.id) {
        res.status(400).send({ Error: "Something is Wrong" });
    }
    id = req.params.id;
    try {
        var getOne = await services.getOnePizza(id);

        if (getOne.length == 0) {
            res.status(400).send({ message: "No record" });
        } else {
            res.status(200)
                .send({ data: getOne });
        }


    } catch (error) {
        console.log(error);
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
    getAll,
    createPizza,
    deletePizza,
    updatePizza,
    getOnePizza
};