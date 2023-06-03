const {Ticket} = require('../models/models');
const {validationResult} = require("express-validator");

class TicketController {
    async create(req, res) {
        try {
            const {
                name, price, description, departureCityId,
                arrivalCityId, departureTime, arrivalTime
            } = req.body;
            const ticket = await Ticket.create({
                name, price, description, departureCityId, arrivalCityId, departureTime, arrivalTime
            });
            return res.json({ticket});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAll(req, res) {
        let {departureCityId, arrivalCityId} = req.query;
        try {
            let tickets;
            if (!departureCityId && !arrivalCityId) {
                tickets = await Ticket.findAndCountAll();
            }
            if (!departureCityId && arrivalCityId) {
                tickets = await Ticket.findAndCountAll({where: {arrivalCityId}});
            }
            if (departureCityId && !arrivalCityId) {
                tickets = await Ticket.findAndCountAll({where: {departureCityId}});
            }
            if (departureCityId && arrivalCityId) {
                tickets = await Ticket.findAndCountAll({where: {departureCityId, arrivalCityId}});
            }
            return res.json(tickets);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
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