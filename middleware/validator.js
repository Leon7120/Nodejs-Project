const { body, param } = require("express-validator");


const pizzaValidator = () => {
    return [
        body("category")
            .exists({ checkFalsy: true })
            .bail()
            .withMessage("Input is required")
            .matches(/^[A-Za-z\s]+$/)
            .withMessage('Category must be alphabetic.'),
        body("price")
            .exists()
            .bail()
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
        body("password")
            .isString({ minLength: 8 })
            // .isStrongPassword({ minLength: 8 })
    ]
};
module.exports = {
    pizzaValidator,
    updateValidator,
    userValidator
}