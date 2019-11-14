const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // const { username, password } = req.headers;
  const token = req.headers.authorization;
  console.log(process.env.JWT_SECRET)

  if (token) {
    const secret = process.env.JWT_SECRET || 'is it secret';

    jwt.verify(token, secret, (err, decodedToken) => {
        console.log('secret');
      if(err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "YOU SHALL NOT PASS"})
  }
};
