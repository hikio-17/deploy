const express = require('express');
const router = express.Router();

// middleware
const { authCheck } = require('../middleware/authCheck');

// controller
const { upload, remove } = require('../controller/cloudinaryController');

// router
router.post("/uploadimages", authCheck, upload);
router.post("/removeimages", authCheck, remove);

module.exports = router;
