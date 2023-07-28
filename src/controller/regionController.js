const asyncHandler = require('express-async-handler');
const { createRegion } = require('../services/regionService');

const createRegionHandler = asyncHandler(async (req, res) => {
  const { name } = req.body
  await createRegion(name);

  res.status(201).json({
    status: 'success',
    message: `Region dengan nama '${name}' berhasil dibuat.`
  })
})

module.exports = {
  createRegionHandler
}
