const { request, response } = require('express');
const {Product, Category} = require('../models');

const createProduct =  async (req = request, res = response) => {
    const {status, user, category, ...rest} = req.body;

    let name = rest.name.toUpperCase();
    const dbProduct = await Product.findOne({name});

    if (dbProduct) {
        return res.status(400).json({msg: `Product with name ${name} already exists`});
    }

    const dbCategory = await Category.findOne({name: category.toUpperCase()});

    if (!dbCategory) {
        return res.status(400).json({msg: `Category with name ${category.toUpperCase()} not exists`});
    }

    const data = {
        ...rest,
        category: dbCategory._id,
        user: req.user._id
    }

    const product = new Product(data);
    await product.save()

    res.status(201).json(product)
}

const getProductById = async (req = request, res = response) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

    if (!product.status) {
        return res.status(400).json({msg: `Product with id ${id} is deactivated`})
    }

    res.json(product);
}

const getProducts = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        await Product.find(query)
            .skip(offset)
            .limit(limit)
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.json({
        total,
        products
    });
}

const deleteProductById = async (req = request, res= response) => {
    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(id, {status: false}).populate('user', 'name').populate('category', 'name');
    const authUser = req.user;

    res.json({
        product,
        authUser
    });
}

const updateProductById = async (req = request, res = response) => {
    const id = req.params.id;
    const {status, user, category, ...data} = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
        const dbProduct = await Product.findOne({name: data.name});

        if (dbProduct) {
            return res.status(400).json({msg: `Product with name ${data.name} already exists`});
        }
    }
    data.user = req.user._id;

    if (category) {
        const dbCategory = await Category.findOne({name: category.toUpperCase()});

        if (!dbCategory) {
            return res.status(400).json({msg: `Category with name ${category.toUpperCase()} not exists`});
        }
        data.category = dbCategory._id;
    }

    const product = await Product.findByIdAndUpdate(id, data, {new: true}).populate('user', 'name').populate('category', 'name');

    res.json(product);
}


module.exports = {
    createProduct,
    getProductById,
    getProducts,
    deleteProductById,
    updateProductById,
}