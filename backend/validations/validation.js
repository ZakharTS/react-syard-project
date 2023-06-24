const {body} = require('express-validator');

const registrationValidator = [
    body('name').isLength({min: 5}),
    body('email').isEmail(),
    body('password').isLength({min: 8})
];

const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({min: 8})
]

const ticketCreateValidator = [
    body('price').isNumeric(),
    body('image').optional().isURL(),
    body('description').optional().isString(),
    body('departureTime').isTime(),
    body('arrivalTime').isTime(),
];


module.exports = {
    registrationValidator,
    loginValidator,
    ticketCreateValidator
};