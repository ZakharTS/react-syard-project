const Router = require('express');
const router = new Router();
const controller = require('../controllers/UserController');
const {registrationValidator} = require('../validations/validation');
const checkAuth = require('../middleware/checkAuth');
const checkValidation = require("../middleware/checkValidation");

router.post('/registration', registrationValidator, checkValidation, controller.registration);
router.post('/login', registrationValidator, checkValidation, controller.login);
router.get('/me', checkAuth, controller.getMe);

module.exports = router;