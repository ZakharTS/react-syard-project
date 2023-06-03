const sequelize = require('../database');
const DataTypes = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING}
});

const BasketTicket = sequelize.define('basketTicket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});
const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const Ticket = sequelize.define('ticket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.DOUBLE, allowNull: false},
    departureCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: City,
            key: 'id'
        }
    },
    arrivalCityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: City,
            key: 'id'
        }
    },
    departureTime: {type: DataTypes.TIME, allowNull: false},
    arrivalTime: {type: DataTypes.TIME, allowNull: false},
    description: {type: DataTypes.STRING}
});

User.hasMany(BasketTicket);
BasketTicket.belongsTo(User);

Ticket.hasMany(BasketTicket);
BasketTicket.belongsTo(Ticket);


module.exports = {User, Ticket, BasketTicket, City};