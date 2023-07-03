const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const {search} = require('../controllers/search');

const router = Router();

router.get('/:collection/:term',[
    validateFields
], search);

module.exports = router;