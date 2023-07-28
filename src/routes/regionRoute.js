const express = require('express');
const { createRegionHandler } = require('../controller/regionController');
const { authCheck, adminCheck } = require('../middleware/authCheck');

const router = express.Router();

router.post('/regions', authCheck, adminCheck, createRegionHandler);

module.exports = router;