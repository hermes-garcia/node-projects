const { Category, Role, User, Product} = require('../models');

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

const categoryExistsById = async(id = '') => {
    const categoryExists =  await Category.findById(id);
    if ( !categoryExists ) {
        throw new Error(`Category with id ${id} not exists`);
    }
};

const productExistsById = async(id = '') => {
    const productExists =  await Product.findById(id);
    if ( !productExists ) {
        throw new Error(`Product with id ${id} not exists`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    userExistsById,
    categoryExistsById,
    productExistsById,
}