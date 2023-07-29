const asyncHandler = require('express-async-handler');
const { login } = require('../services/authService');
const { createAccessToken } = require('../tokenize/TokenManager');

const userLoginHandler = asyncHandler(async (req, res) => {
   const user = await login(req.body);
   const accessToken = await createAccessToken(user.id);

   res.status(200).json({
      status: 'success',
      data: {
         accessToken
      }
   })
});

module.exports = {
   userLoginHandler,
}
