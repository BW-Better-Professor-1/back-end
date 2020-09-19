const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('./auth-helpers');

//once database created - we need model for router


router.get('/', (req,res) =>{
  res.status(200).json({ auth: 'endpoint up and running' })
})

router.post('/register', (req, res) => {
  // fill this in
  
});

router.post('/login', (req, res) => {
  // fill this in
  
});


/* uncomment when ready to implement */ 
// function signToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//   };

//   const options = {
//     expiresIn: '12h',
//   };

//   return jwt.sign(payload, secret.jwtSecret, options);
// }

module.exports = router;
