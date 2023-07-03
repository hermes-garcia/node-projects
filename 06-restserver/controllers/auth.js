const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt-generator');
const {googleVerify} = require('../helpers/google-verify');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                msg: "Email not found"
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User not active"
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Incorrect password"
            });
        }

        const jwt = await generateJWT(user.id);

        res.json({
            user,
            jwt
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Something goes wrong!'
        });
    }
}

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token);

        let user = await User.findOne({email});
        if (!user) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                isGoogle: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'User blocked'
            });
        }

        const jwt = await generateJWT(user.id);

        res.json({
            user,
            jwt
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: 'Token could not be validated'
        });
    }
}


module.exports = {
    login,
    googleSignIn,
}