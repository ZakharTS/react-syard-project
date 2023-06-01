require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');


module.exports = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.userId}});;
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }
        if (user.role == 'admin') {
            next();
        } else {
            return res.status(403).json({
                message: "Forbidden."
            });
        }
    } catch (e) {
        return res.status(403).json({
            message: e.message
        });
    }
};