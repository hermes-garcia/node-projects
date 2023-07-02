const { Router } = require('express');
const { check } = require('express-validator');
const {getUsers, updateUser, createUser, deleteUser, patchUser} = require('../controllers/users');
const {validateFields} = require('../middlewares/validate-fields');
const {isValidRole, emailExists, userExistsById} = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.put('/:userId',[
        check('userId', 'Not a valid user id').isMongoId(),
        check('userId').custom( userExistsById ),
        check('role').custom( isValidRole ),
        validateFields
    ],
    updateUser
);

router.post('/',[
        check('name', 'Name is required').notEmpty(),
        check('password', 'Password must be longer than 6').isLength({ min: 6 }),
        check('email', 'Email is not valid').isEmail(),
        check('email').custom( emailExists ),
        //check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validateFields
    ],
    createUser
);

router.delete('/:userId', [
        check('userId', 'Not a valid user id').isMongoId(),
        check('userId').custom( userExistsById ),
        validateFields
], deleteUser);

router.patch('/', patchUser);


module.exports = router;