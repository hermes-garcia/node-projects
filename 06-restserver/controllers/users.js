const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
    const { q, name = 'No name', apiKey, page= 1, limit = 10 } = req.query;
    res.json({
        msg: 'get api - controller',
        q,
        name,
        apiKey,
        page,
        limit
    });
}

const createUser = (req = request, res = response) => {
    const body = req.body;

    res.status(201).json({
        msg: 'post api - controller',
        body
    });
}

const updateUser = (req = request, res = response) => {
    const id = req.params.userId;
    res.json({
        msg: 'put api - controller',
        id
    });
}

const deleteUser = (req = request, res= response) => {
    res.json({
        msg: 'delete api - controller'
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