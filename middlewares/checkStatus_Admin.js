const router = require('express').Router();
const ObjectId = require('mongoose');
const usersModel = require('../models/users');

router.use('/',function (req, res ,next) {
  if (req.session.user){
    next();
  } else {

    let token = req.headers['x-access-token'];

    usersModel.findOne({accessToken : token ,role : 'admin'},(err,user)=>{
      if (err) throw err;
      if (user) {
        req.session.user = user['_id'];
        next();
      } else {
        res.status(500).json({
          auth : false,
          message : 'admin-user is not authorized'
        });
      }
    });

  }
})

module.exports = router;
