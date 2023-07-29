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

const currentUserHandler = asyncHandler(async (req, res) => {
   const user = req.user;

   res.status(200).json({
      status: 'success',
      data: {
         user
      }
   })
})

module.exports = {
   createUserHandler,
   currentUserHandler,
}