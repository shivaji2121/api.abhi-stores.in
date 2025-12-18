const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthorized = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(404).json({ message: "Access denied-No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.userId, deletedAt: null });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('error: ', error);
        res.status(401).json({ message: 'Invalid token.' });

    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin role required.' });

    }
    next();
}

module.exports = {
    isAuthorized, isAdmin
};
