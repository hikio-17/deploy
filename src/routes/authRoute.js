const express = require('express');
const { userLoginHandler } = require('../controller/authController');

const router = express.Router();

router.post('/auth', userLoginHandler);

module.exports = router;