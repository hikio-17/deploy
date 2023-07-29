const express = require('express');
const { createUserHandler, currentUserHandler } = require('../controller/userController');
const { authCheck } = require('../middleware/authCheck')

const router = express.Router();

router.get('/me', authCheck, currentUserHandler);
router.post('/users', createUserHandler);

module.exports = router;