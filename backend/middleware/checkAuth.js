require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        
            req.userId = decoded.id;

            next();
        } catch (e) {
            return res.status(403).json({
                message: "Forbidden."
            });
        }
    } else {
        return res.status(403).json({
            message: 'No token.'
        });
    }

    //return res.send(token);
    //console.log(token);
    //next();
};