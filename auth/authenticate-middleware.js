const jwt = require('jsonwebtoken');

const secret = require('./auth-helpers');

// verifies that the JwT token is in the header to reach a protected/authenticated route
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: `Your Session Expired. Please Sign-In` });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: `Your Session Expired. Please Sign-In` });
  }
};
