const express = require('express');
const { createRegionHandler, getAllRegionHandler } = require('../controller/regionController');
const { authCheck, adminCheck } = require('../middleware/authCheck');
const { findAllRegion } = require('../services/regionService');

const router = express.Router();

router.get('/regions', getAllRegionHandler);
router.post('/regions', authCheck, adminCheck, createRegionHandler);


module.exports = router;