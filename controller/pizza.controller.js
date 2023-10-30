const services = require('./pizza.services');
const { validationResult } = require("express-validator");

var getAllPizza = async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            var getAll = await services.getAllPizza();
        } else if (req.query.id || req.query.category || req.query.price) {
            var getSpecificPizza = await services.getSpecificPizza(req.query);
        }
        if (getSpecificPizza || getAll) {
            res.status(200)
                .send({ data: getSpecificPizza || getAll });
        } else {
            res.status(400)
                .send({ message: "No pizza found!" })
        }
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500)
            .send({ message: "Server Problem" })
    }
}
var createPizza = async (req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${msg}`;
    };
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.mapped() });
    }
    try {
        const createPizza = await services.createPizza(req.body)
        if (createPizza) {
            res.status(201)
                .send({ message: "Successfully Created A New Pizza" });
        }
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500)
            .send({ message: "Server Problem" })
    }
}
var deletePizza = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ message: "Empty Input" });
    }
    try {
        const deletePizza = await services.deletePizza(req.params.id);
        if (deletePizza) {
            res.status(200)
                .send({ message: "Successfully Deleted A Pizza" });
        } else {
            res.status(200)
                .send({ message: "Nothing Happened" });
        }
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500)
            .send({ message: "Server Problem" })
    }
}
var updatePizza = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    try {
        let updatePizza = await services.updatePizza(req.params.id, req.body.category, req.body.price);
        if (updatePizza) {
            res.status(200)
                .send({ message: "Successfully updated the pizza details" })
        } else {
            res.status(400)
                .send({ message: "Something wrong!" })
        }
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500)
            .send({ message: "Server Problem" })
    }
}
var getOnePizza = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ message: "Empty Input" });
    }
    try {
        var getOne = await services.getOnePizza(req.params.id);
        if (getOne) {
            res.status(200)
                .send({ data: getOne });
        } else {
            res.status(400)
                .send({ message: "No pizza found!" });
        }
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500)
            .send({ message: "Server Problem" })
    }
}
module.exports = {
    getAllPizza,
    createPizza,
    deletePizza,
    updatePizza,
    getOnePizza
};