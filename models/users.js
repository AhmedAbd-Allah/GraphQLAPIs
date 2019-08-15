const moongose = require('mongoose');
const Schema = moongose.Schema;

const userSchema = new Schema({
  userName: String,
  password:String,
  firstName: String,
  lastName: String,
  country: String,
  city: String,
  birthDate: String,
  address: String,
  job: String,
  authDetails: {
    provider: String,
    ID: {
      type : String,
      default : null
    }
  },
  role: {
    type : String,
    default : 'patient'
  },
  nationalID: String,
  nationalID_img : String,
  email: String,
  email_verification: {
    code : String,
    status :{
      type : Boolean,
      default : false
    }
  },
  mobile: String,
  mobile_verfication : {
    code : String,
    expireDate : Date,
    status : {
      type : Boolean,
      default : false
    }
  },
  gender: String,
  image: String,
  passwordReset : {
    passwordResetToken : {
      type : String,
      default : null
    },
    passwordResetExpire : {
      type : Date,
      default : null
    },
  },
  accountStatus : Number,
  accessToken : String
});

moongose.model('users',userSchema);

module.exports = moongose.model('users');
