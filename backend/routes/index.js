const Router = require('express');
const router = new Router();

const userRouter = require('./UserRouter');
const ticketRouter = require('./TicketRouter');


router.use('/user', userRouter);
router.use('/ticket', ticketRouter);


module.exports = router;