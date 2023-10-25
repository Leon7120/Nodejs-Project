const { body, param } = require("express-validator");

const pizzaValidator = () => {
    return [
        body("P_Category")
            .exists({ checkFalsy: true })
            .withMessage("Input is required")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('Category must be alphabetic.'),
        body("P_Price")
            .exists()
            .withMessage("Input is required")
            .isNumeric()
            .withMessage("Price should be Integer")
    ]

};

const updateValidator = () => {
    return [
        param("id")
            .exists()
            .withMessage("Input is required")
            .isNumeric()
            .withMessage("id should be numeric"),
        body("category")
            .exists()
            .withMessage("Input is required")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('Category must be alphabetic.'),
        body("price")
            .exists()
            .withMessage("Input is required")
            .isNumeric()
            .withMessage("Price should be numeric")
    ]
}

const userValidator = () => {
    return [
        body("username")
            .exists()
            .isString()
            .isLength({ min: 6 }),
        // body("password")
        //     .isStrongPassword({ minLength: 8 })
    ]
};
module.exports = {
    pizzaValidator,
    updateValidator,
    userValidator
}