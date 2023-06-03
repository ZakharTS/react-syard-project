const {BasketTicket, Ticket} = require('../models/models');

class BasketTicketController {
    async create(req, res) {
        try {
            const {userId, ticketId} = req.body;
            const basketTicket = await BasketTicket.create({userId, ticketId});
            return res.json(basketTicket);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAll(req, res) {
        try {
            const basketTickets = await BasketTicket.findAndCountAll({
                where: {userId: req.userId}, include: [
                    {
                        model: Ticket
                    }
                ]
            });
            return res.json(basketTickets);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        try {
            const basketTicket = await BasketTicket.findOne({
                where: {id}
            });
            if (basketTicket == null) {
                return res.status(404).json({message: "BasketTicket not found"});
            }
            return res.json(basketTicket);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getByTicketId(req, res) {
        const {id} = req.params;
        try {
            const basketTicket = await BasketTicket.findOne({
                where: {ticketId: id, userId: req.userId}
            });
            if (basketTicket == null) {
                return res.json({id: 0, userId: 0, ticketId: 0});
            }
            return res.json(basketTicket);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async removeOne(req, res) {
        const {id} = req.params;
        try {
            const basketTicket = await BasketTicket.findOne({
                where: {id}
            });
            if (basketTicket == null) {
                return res.status(404).json({message: "BasketTicket not found"});
            }
            await BasketTicket.destroy({
                where: {id}
            });
            return res.json({message: "OK"});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async removeByTicketId(req, res) {
        const {id} = req.params;
        try {
            const basketTicket = await BasketTicket.findOne({
                where: {ticketId: id, userId: req.userId}
            });
            if (basketTicket == null) {
                return res.status(404).json({message: "BasketTicket not found"});
            }
            await BasketTicket.destroy({
                where: {ticketId: id, userId: req.userId}
            });
            return res.json({message: "OK"});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = new BasketTicketController();