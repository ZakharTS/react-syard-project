const {Ticket} = require('../models/models');
const {validationResult} = require("express-validator");

class TicketController {
    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        try {
            const {
                name, price, image, description, departureCityId,
                arrivalCityId, departureTime, arrivalTime
            } = req.body;
            const ticket = await Ticket.create({
                name, price, image, description,
                departureCityId, arrivalCityId, departureTime, arrivalTime
            });
            return res.json({ticket});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAll(req, res) {
        let {departureCityId, arrivalCityId, limit, page} = req.query;
        limit = limit || 10;
        page = page || 1;
        let offset = page * limit - limit;
        let tickets;
        if (!departureCityId && !arrivalCityId) {
            tickets = await Ticket.findAndCountAll({limit, offset});
        }
        if (!departureCityId && arrivalCityId) {
            tickets = await Ticket.findAndCountAll({where: {arrivalCityId}, limit, offset});
        }
        if (departureCityId && !arrivalCityId) {
            tickets = Ticket.findAndCountAll({where: {departureCityId}, limit, offset});
        }
        if (departureCityId && arrivalCityId) {
            tickets = Ticket.findAndCountAll({where: {departureCityId, arrivalCityId}, limit, offset});
        }
        //return res.json(page);
        return res.json(tickets);
    }

    async getOne(req, res) {
        const {id} = req.params;
        try {
            const ticket = await Ticket.findOne({
                where: {id}
            });
            if (ticket == null) {
                return res.status(404).json({message: "Ticket not found"});
            }
            return res.json(ticket);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async removeOne(req, res) {
        const {id} = req.params;
        try {
            const ticket = await Ticket.findOne({
                where: {id}
            });
            if (ticket == null) {
                return res.status(404).json({message: "Ticket not found"});
            }
            await Ticket.destroy({
                where: {id}
            });
            return res.json({message: "OK"});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = new TicketController();