const asyncHandler = require('express-async-handler');
const { createuser, existingEmail } = require('../services/userService');

const createUserHandler = asyncHandler(async (req, res) => {
   await existingEmail(req.body.email);
   await createuser(req.body);
   
   res.status(200).json({
      status: 'success',
      message: 'User baru berhasil didaftarkan.'
   });
});

module.exports = {
   createUserHandler
}