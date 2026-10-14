import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("email")
        .exists()
        .withMessage("Email is required").bail()
        .trim()
        .isEmail()
        .withMessage("Enter a valid email addresss"),
    body("name")
        .exists()
        .withMessage("Name is required").bail()
        .isString()
        .withMessage("Name must be a String")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name should be between 2 to 50 chatacters"),
    body("password")
        .exists()
        .withMessage("Password is required").bail()
        .isString()
        .withMessage("Password must be a String")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be minimum 6 charaters long"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Error",
                errors: errors.array()
            });
        }
        next();
    },
];


export const loginValidator = [
    body('email')
        .exists().withMessage("Email is required")
        .isString().withMessage("Password should be in String")
        .trim()
        .isEmail().withMessage("Enter a valid email addresss"),
    body('password')
        .exists().withMessage("Password is required")
        .isString().withMessage("Password should be in String")
        .trim()
        .isLength({ min: 6 }).withMessage("Password should be minimum 6 charaters"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid error",
                errors: errors.array()
            })
        }
        next()
    }
]