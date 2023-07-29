const express = require('express');
const { createUserHandler, currentUserHandler, getAllUserHandler, deleteUserByIdHandler, getUserByIdHandler } = require('../controller/userController');
const { authCheck } = require('../middleware/authCheck')

const router = express.Router();

router.get('/users/:id', authCheck, getUserByIdHandler);
router.get('/users', authCheck, getAllUserHandler);
router.get('/me', authCheck, currentUserHandler);
router.post('/users', createUserHandler);
router.delete('/users/:id', authCheck, deleteUserByIdHandler);

module.exports = router;