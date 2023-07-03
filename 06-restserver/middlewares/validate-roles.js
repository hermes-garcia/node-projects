const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
           msg: 'Token not validated'
        });
    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an admin user`
        });
    }

    next();
}

const userHasRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Token not validated'
            });
        }

        if ( !roles.includes(req.user.role) ) {
            return res.status(401).json({
                msg: 'User not have a valid role for this action'
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    userHasRole,
}