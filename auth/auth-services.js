const jwt = require("jsonwebtoken");

const secret = require('./auth-helpers');

module.exports = {
    isValid,
    signToken
  };
  
// checks validty of user by comparing user's name and password
function isValid(user) {
    return Boolean(user.name && user.password && typeof user.password === "string");
};

// creates JwT token for auth
function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.name,
  };

  const options = {
    expiresIn: '12h', // comment out as needed to trigger a sign out until we implement real solution
    // expiresIn: '2s', // uncomment out as needed to trigger a sign out until we implement real solution
  };
  return jwt.sign(payload, secret.jwtSecret, options);
};