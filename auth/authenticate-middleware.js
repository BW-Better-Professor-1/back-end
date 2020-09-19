const jwt = require('jsonwebtoken');

const secret = require('./auth-helpers');


module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: `Invalid token` });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: `Unable to Sign-In. Please Try Again` });
  }
};
