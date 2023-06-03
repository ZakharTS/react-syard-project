const {City} = require('../models/models');

class CityController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const city = await City.create({ name });
            return res.json(city);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getAll(req, res) {
        try {
           const cities = await City.findAndCountAll();
            return res.json(cities);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getOne(req, res) {
        const {id} = req.params;
        try {
            const city = await City.findOne({
                where: {id}
            });
            if (city == null) {
                return res.status(404).json({message: "City not found"});
            }
            return res.json(city);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async removeOne(req, res) {
        const {id} = req.params;
        try {
            const city = await City.findOne({
                where: {id}
            });
            if (city == null) {
                return res.status(404).json({message: "City not found"});
            }
            await City.destroy({
                where: {id}
            });
            return res.json({message: "OK"});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = new CityController();