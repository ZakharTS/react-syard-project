const Router = require('express');
const router = new Router();
const controller = require('../controllers/BasketTicketController');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, controller.create);
router.get('/', checkAuth, controller.getAll);
router.get('/:id', controller.getOne);
router.get('/ticket/:id', checkAuth, controller.getByTicketId);
router.delete('/:id', checkAuth, controller.removeOne);
router.delete('/ticket/:id', checkAuth, controller.removeByTicketId);

module.exports = router;