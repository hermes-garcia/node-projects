const { Router } = require('express');
const {getUsers, updateUser, createUser, deleteUser, patchUser} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.put('/:userId', updateUser);

router.post('/', createUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);


module.exports = router;