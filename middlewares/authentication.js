const jwt = require('jsonwebtoken');
const { TOKEN_ERROR_TYPE, TOKEN_ERROR_MSG } = require('../constants/jwt');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = verifyToken(token);
    req.decodedUser = decoded;
  } catch (error) {
    const errorMsg =
      error.name === TOKEN_ERROR_TYPE.EXPIRE
        ? TOKEN_ERROR_MSG.TOKEN_EXPIRED
        : TOKEN_ERROR_MSG.INVALID;
    return res.status(401).send(errorMsg);
  }

  return next();
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('A token is required for authentication');
  }
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE_INTERVAL || '30d',
  });
};

module.exports = { authenticate, verifyToken, generateToken };
