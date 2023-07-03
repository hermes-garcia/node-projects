const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJwt = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Not valid token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findById(uid);

        if (!user || !user.status) {
            res.status(401).json({
                msg: 'Not valid token'
            });
        }

        req.user = user;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
           msg: 'Not valid token'
        });
    }
}

module.exports = {
    validateJwt,
}