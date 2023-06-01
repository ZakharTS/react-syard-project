const {body} = require('express-validator');

const registrationValidator = [
    //body('avatar').optional().isURL(),
    body('name').isLength({min: 5}),
    body('email').isEmail(),
    body('password').isLength({min: 8})
];

const ticketCreateValidator = [
    body('name').isEmpty(),
    body('price').isNumeric(),
    body('image').optional().isURL(),
    body('description').optional().isString(),
    body('departureCityId').isEmpty(),
    body('arrivalCityId').isEmpty(),
    body('departureTime').isEmpty().isDate(),
    body('arrivalTime').isEmpty().isDate(),
];

module.exports = {
    registrationValidator,
    ticketCreateValidator
};