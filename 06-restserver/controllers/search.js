const { request, response } = require('express');
const {User, Category, Product} = require('../models');
const {ObjectId} = require('mongoose').Types;

const availableCollections = [
    'users',
    'categories',
    'products',
    'roles',
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regexp = new RegExp( term, 'i' );
    const users = await User.find({
        $or: [{name: regexp}, {email: regexp}],
        $and: [{status: true}]
    });
    res.json({
        results: users
    });
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term).populate('user','name');
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regexp = new RegExp( term, 'i' );
    const categories = await Category.find({name: regexp, status: true}).populate('user','name');
    res.json({
        results: categories
    });
}


const searchProducts = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Category.findById(term).populate('user','name').populate('category','name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regexp = new RegExp( term, 'i' );
    const products = await Product.find({name: regexp, status: true}).populate('user','name').populate('category','name');
    res.json({
        results: products
    });
}

const search = async(req = request, res = response) => {
    const {collection, term} = req.params;
    if ( !availableCollections.includes(collection) ) {
        return res.status(400).json({
            msg: `Collection ${collection} is not available`
        });
    }

    try {

        switch (collection) {
            case 'users':
                searchUsers(term, res);
                break;
            case 'categories':
                searchCategories(term, res)
                break;
            case 'products':
                searchProducts(term, res)
                break;
            default:
                return res.status(500).json({
                    msg: 'Not implemented'
                })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Something goes wrong!'
        });
    }
}

module.exports = {
    search,
}