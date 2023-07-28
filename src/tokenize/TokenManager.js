/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const AuthenticationError = require('../exeptions/AuthenticationError');

exports.createAccessToken = async (id) => {
  const token = await jwt.sign({
    id,
  }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 });
  return token;
};

exports.verifyAccessToken = async (token) => {
  const isValid = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!isValid) {
    throw new AuthenticationError('Access token not valid');
  }
};

exports.decodePayload = async (token) => jwt.decode(token, process.env.JWT_SECRET_KEY);