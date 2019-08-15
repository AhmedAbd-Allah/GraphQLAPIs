const router = require('express').Router();
const userModel = require('../models/users');
const ObjectId = require('mongoose').Types.ObjectId;


router.use('/',function (req, res ,next) {
  userModel.findOne({_id:new ObjectId(req.session.user)},(err,user)=>{
    if (user.mobile_verfication.status) {
      next();
    } else {
      res.json({
        activation_status : false,
        message : 'the modile is not activated'
      });
    }
  });
});

module.exports = router;
