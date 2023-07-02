const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async(req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        await User.find(query)
            .skip(offset)
            .limit(limit)
    ])

    res.json({
        total,
        users
    });
}

const createUser = async(req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role} );

    const salt = bcryptjs.genSaltSync();
    user.password =  bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        user
    });
}

const updateUser = async(req = request, res = response) => {
    const id = req.params.userId;
    const { _id, password, isGoogle, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password =  bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}

const deleteUser = async(req = request, res= response) => {
    const id = req.params.userId;

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        user
    });
}

const patchUser = (req = request, res = response) => {
    res.json({
        msg: 'patch api - controller'
    });
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    patchUser,
}