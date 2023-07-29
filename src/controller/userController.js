const asyncHandler = require('express-async-handler');
const { createuser, existingEmail, findAllUser, destroyUser, findUserById, updateUser } = require('../services/userService');

const createUserHandler = asyncHandler(async (req, res) => {
   await existingEmail(req.body.email);
   await createuser(req.body);
   
   res.status(200).json({
      status: 'success',
      message: 'User baru berhasil didaftarkan.'
   });
});

const currentUserHandler = asyncHandler(async (req, res) => {
   const user = await findUserById(req.user.id, (req.user));

   res.status(200).json({
      status: 'success',
      data: {
         user
      }
   })
})

const getAllUserHandler = asyncHandler(async (req, res) => {
   const users = await findAllUser(req.user);

   res.status(200).json({
      status: 'success',
      data: {
         users,
      }
   })
});

const getUserByIdHandler = asyncHandler(async (req, res) => {
   const { id: userId } = req.params;
   const user = await findUserById(userId, req.user);

   res.status(200).json({
      status: 'sucess',
      data: {
         user
      }
   })
});

const updateUserByIdHandler = asyncHandler(async (req, res) => {
   const { id: userId } = req.params;
   await updateUser(req.user, userId, req.body);

   res.status(200).json({
      status: 'success',
      message: `Data user dengan id '${userId}' berhasil diperbarui`
   });
});

const deleteUserByIdHandler = asyncHandler(async(req, res) => {
   const { id: userId } = req.params;

   await destroyUser(userId, req.user);

   res.status(200).json({
      status: 'success',
      message: `User dengan id '${userId}' berhasil dihapus`
   });
})

module.exports = {
   createUserHandler,
   currentUserHandler,
   getAllUserHandler,
   getUserByIdHandler,
   deleteUserByIdHandler,
   updateUserByIdHandler,
}