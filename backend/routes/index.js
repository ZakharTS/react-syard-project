const Router = require('express');
const router = new Router();

const userRouter = require('./UserRouter');
const ticketRouter = require('./TicketRouter');
const cityRouter = require('./CityRouter');
const basketRouter = require('./BasketTicketRouter')


router.use('/user', userRouter);
router.use('/ticket', ticketRouter);
router.use('/city', cityRouter);
router.use('/basket', basketRouter);

module.exports = router;