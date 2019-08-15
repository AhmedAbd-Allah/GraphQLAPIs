const router = require('express').Router();
const userModel = require('../models/users');
const ObjectId = require('mongoose').Types.ObjectId;


router.use('/',function (req, res ,next) {
  UserModel.findOne({_id:new ObjectId(req.session.user)},(err,user)=>{
    if (user.nationalID_img) {
      next();
    } else {
      res.json({
        activation_status : false,
        message : 'the nationalID is not activated'
      });
    }
  });
});

module.exports = router;
