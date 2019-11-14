const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkDepartment("student"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

function checkDepartment(department) {
    console.log('ASDF', department)
  return function(req, res, next){
      console.log("THIS REQ", req.decodedJwt)
    if(department === req.decodedJwt.user.department) {
      next();
    } else {
      res.status(403).json({ message: 'Cant touch this' })
    }
  }
}
