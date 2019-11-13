const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // const { username, password } = req.headers;
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET || 'is it secret';

    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        res.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided"})
  }
};
