const services = require('./services');
const { validationResult } = require("express-validator");

var getAllPizza = async (req, res) => {
    try {
        var getAll = await services.getAllPizza();
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
    try {
        services.createPizza(req.body);
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
    try {
        if (await services.deletePizza(req.params.id)) {
            res.status(204)
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
    try {
        let check = await services.updatePizza(req.params.id, req.body.category, req.body.price);
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
    try {
        var getOne = await services.getOnePizza(req.params.id);
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
    getAllPizza,
    createPizza,
    deletePizza,
    updatePizza,
    getOnePizza
};