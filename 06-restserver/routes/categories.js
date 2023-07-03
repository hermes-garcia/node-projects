const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJwt} = require('../middlewares/validate-jwt');
const {createCategory, getCategoryById, getCategories, deleteCategoryById, updateCategoryById} = require('../controllers/categories');
const {categoryExistsById} = require('../helpers/db-validators');
const {isAdminRole} = require('../middlewares');

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'Not a valid category id').isMongoId(),
    check('id').custom( categoryExistsById ),
    validateFields,
], getCategoryById);

router.post('/', [
    validateJwt,
    check('name', 'Category name is required').notEmpty(),
    validateFields,
], createCategory);

router.put('/:id', [
    validateJwt,
    check('name', 'Category name is required').notEmpty(),
    check('id').custom( categoryExistsById ),
    validateFields,
], updateCategoryById);

router.delete('/:id', [
    validateJwt,
    isAdminRole,
    check('id', 'Not a valid category id').isMongoId(),
    check('id').custom( categoryExistsById ),
    validateFields
], deleteCategoryById);

module.exports = router;