const asyncHandler = require('express-async-handler');
const { createRegion, findAllRegion } = require('../services/regionService');

const createRegionHandler = asyncHandler(async (req, res) => {
  const { name } = req.body
  await createRegion(name);

  res.status(201).json({
    status: 'success',
    message: `Region dengan nama '${name}' berhasil dibuat.`
  })
})

const getAllRegionHandler = asyncHandler(async(req, res) => {
  const regions = await findAllRegion();

  res.status(200).json({
    status: 'success',
    data: {
      regions
    }
  })
})

module.exports = {
  createRegionHandler,
  getAllRegionHandler,
}
