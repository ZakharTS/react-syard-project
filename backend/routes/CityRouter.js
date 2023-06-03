const Router = require('express');
const router = new Router();
const controller = require('../controllers/CityController');
const { cityCreateValidator } = require('../validations/validation');
const checkValidation = require('../middleware/checkValidation');
const checkAuth = require('../middleware/checkAuth');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/', checkAuth, checkAdmin, controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.delete('/:id', checkAuth, checkAdmin, controller.removeOne);

module.exports = router;