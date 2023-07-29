const cloudinary = require('cloudinary');
const asyncHandler = require('express-async-handler');

// config
cloudinary.config({
  cloud_name: 'hikio-17',
  api_key: '921939215128972',
  api_secret: 'GEj0BuvOoF9nLE468oSEhV7fIjw',
});

const upload = asyncHandler(async (req, res) => {
   console.log(req.body.image)
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

const remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};

module.exports = {
   upload,
   remove,
}
