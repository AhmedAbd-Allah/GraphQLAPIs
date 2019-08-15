const router = require('express').Router();
const usersModel = require('../models/users');

router.use('/',function (req, res ,next) {
  if (req.session.user){
    res.status(200).json({
      auth : true,
      message : 'user is already logged in'
    });
  } else {

    let token = req.headers['x-access-token'];

    usersModel.findOne({accessToken : token},(err,user)=>{
      if (err) throw err;
      if (user) {
        req.session.user = user['_id'];
        res.status(200).json({
          auth : true,
          message : 'user is authenticated'
        });
      } else {
        req.session.user = null;
        next();
      }
    });

  }
})

module.exports = router;
