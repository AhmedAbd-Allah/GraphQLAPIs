const mongoose = require('mongoose');
const userModel = require('../../models/users');
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
  Query: {
    User: function (_,_,context) {
      return new Promise(function(resolve, reject) {
        userModel.findOne({_id:new ObjectId(context.user)},{_id:false},(err,user)=>{
          if(!err){
            resolve(user);
          }
        })
      });
    },


    setNationalID: function (_,{nationalID},context){
      return new Promise(function(resolve, reject) {

        userModel.findOne({nationalID : nationalID},{_id:false},(err,testUser)=>{

          if (!testUser) {

            userModel.findOne({_id:new ObjectId(context.user)},{_id:false},(err,user)=>{
              if(!err && user){
                user['nationalID'] = nationalID;
                user.save((err,doc)=>{
                  if(!err){
                    doc.isDublicate = false;
                    resolve(doc);
                  }
                });
              }
            });

          } else {
            user.isDublicat = true;
            resolve(testUser);
          }

        });

      });

    },

    activateNationalID: function (_,{imageUrl},context) {
      return new Promise(function(resolve, reject) {
        userModel.findOne({_id:new ObjectId(context.user)},{_id:false},(err,user)=>{
          if(!err){
            user['image'] = imageUrl;
            user['accountStatus'] -= 1;
            user.save((err,doc)=>{
              if(!err){
                resolve(doc);
              }
            });
          }
        })
      });
    },

  }
}


module.exports.Resolvers = resolvers;
