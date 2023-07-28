const express = require('express');
const { createRegionHandler } = require('../controller/regionController');

const router = express.Router();

router.post('/regions', createRegionHandler);

module.exports = router;