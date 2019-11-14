const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole("student"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkRole(role) {
    console.log('ASDF', role)
  return function(req, res, next){
      console.log("THIS REQ", req.decodedJwt)
    if(role === req.decodedJwt.role) {
      next();
    } else {
      res.status(403).json({ message: 'Cant touch this' })
    }
  }
}
