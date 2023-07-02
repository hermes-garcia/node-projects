const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if (!roleExists) {
        throw new Error(`Role ${role} is not defined in db`);
    }
};

const emailExists = async(email = '') => {
    const emailExists =  await User.findOne({email});
    if (emailExists) {
        throw new Error(`Email ${email} is already registered`);
    }
};


const userExistsById = async(id = '') => {
    const userExists =  await User.findById(id);
    if ( !userExists ) {
        throw new Error(`User with id ${id} not exists`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
}