const express = require('express');
const { createUserHandler } = require('../controller/userController');

const router = express.Router();

router.post('/users', createUserHandler);

module.exports = router;