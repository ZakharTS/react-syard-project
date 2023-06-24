require('dotenv').config();
const uuid = require('uuid');
const path = require('path');
const {validationResult} = require("express-validator");
const {User, Ticket} = require("../models/models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserController {
    async registration(req, res) {
        try {
            let {role, name, email, password} = req.body;
            let {avatar} = req.files;
            //let avatar = null;
            role = role || 'user';
            let fileName = "default-logo.png";
            if (avatar) {
                fileName = uuid.v4() + avatar.name.substring(avatar.name.length - 4, avatar.name.length);
                await avatar.mv(path.resolve(__dirname, '..', 'static', fileName));
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = await User.create({
                role,
                name,
                email,
                password: passwordHash,
                avatar: fileName
            });

            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_TOKEN, {
                expiresIn: '30d'
            });
            return res.json({user, token});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }

        // res.json({message: 'ok'});
    }

    async login(req, res) {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                })
            }
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(400).json({
                    message: 'Not valid password'
                });
            }

            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_TOKEN, {
                expiresIn: '30d'
            });
            return res.json({user, token});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async getMe(req, res) {
        try {
            const user = await User.findOne({where: {id: req.userId}});
            if (!user) {
                return res.status(404).json({
                    message: "User not found."
                });
            }
            return res.json({
                user: user,
                token: (req.headers.authorization || '').replace(/Bearer\s?/, '')
            });
        } catch (e) {
            return res.status(500).json({
                message: e.message,
                token: (req.headers.authorization || '').replace(/Bearer\s?/, ''),
                userId: req.userId
            });
        }
    }

    // async removeOne(req, res) {
    //     const {id} = req.params;
    //     try {
    //         const user = await User.findOne({
    //             where: {id}
    //         });
    //         if (user == null) {
    //             return res.status(404).json({message: "Ticket not found"});
    //         }
    //         await User.destroy({
    //             where: {id}
    //         });
    //         return res.json({message: "OK"});
    //     } catch (e) {
    //         return res.status(500).json({message: e.message});
    //     }
    // }
}

module.exports = new UserController();