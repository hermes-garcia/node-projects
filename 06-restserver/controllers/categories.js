const { request, response } = require('express');
const {Category} = require('../models');

const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const dbCategory = await Category.findOne({name});

    if (dbCategory) {
        return res.status(400).json({msg: `Category with name ${name} already exists`});
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);
    await category.save()

    res.status(201).json(category)
}

const getCategoryById = async (req = request, res = response) => {
    const id = req.params.id;
    const category = await Category.findById(id).populate('user', 'name');

    if (!category.status) {
        return res.status(400).json({msg: `Category with id ${id} is deactivated`})
    }

    res.json(category);
}

const getCategories = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        await Category.find(query)
            .skip(offset)
            .limit(limit)
            .populate('user', 'name')
    ]);

    res.json({
        total,
        categories
    });
}

const deleteCategoryById = async (req = request, res= response) => {
    const id = req.params.id;

    const category = await Category.findByIdAndUpdate(id, {status: false}).populate('user', 'name');
    const authUser = req.user;

    res.json({
        category,
        authUser
    });
}

const updateCategoryById = async (req = request, res = response) => {
    const id = req.params.id;
    const {status, user, ...data} = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const dbCategory = await Category.findOne({name: data.name});

    if (dbCategory) {
        return res.status(400).json({msg: `Category with name ${data.name} already exists`});
    }

    const category = await Category.findByIdAndUpdate(id, data, {new: true}).populate('user', 'name');

    res.json(category);
}

module.exports = {
    createCategory,
    getCategoryById,
    getCategories,
    deleteCategoryById,
    updateCategoryById,
}