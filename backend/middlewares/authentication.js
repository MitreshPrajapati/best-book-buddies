const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
    const token = req.headers.authentication.split(' ')[1];
    if (!token) {
        return res.send({ message: 'Unauthorized - Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        return res.send({ message: 'Unauthorized - Invalid token' });
    }
};

module.exports = {authenticateUser};
