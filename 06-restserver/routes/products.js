const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJwt} = require('../middlewares/validate-jwt');
const {productExistsById} = require('../helpers/db-validators');
const {isAdminRole} = require('../middlewares');
const {createProduct, getProductById, getProducts, deleteProductById, updateProductById} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Not a valid product id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields,
], getProductById);

router.post('/', [
    validateJwt,
    check('name', 'Product name is required').notEmpty(),
    check('category', 'Category name is required').notEmpty(),
    validateFields,
], createProduct);

router.put('/:id', [
    validateJwt,
    check('id').custom( productExistsById ),
    validateFields,
], updateProductById);

router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check('id', 'Not a valid product id').isMongoId(),
    check('id').custom( productExistsById ),
    validateFields
], deleteProductById);

module.exports = router;