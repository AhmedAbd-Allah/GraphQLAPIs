const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const radioSchema = new Schema({
  patientId : {
    type : ObjectId,
    ref : "users"
  },
  diseaseId : {
    type : ObjectId,
    ref : "diseases"
  },
  name : String,
  category : String,
  date : String,
  reportImg : String,
  radioImgs : [String],
  comment : String
});

mongoose.model('radios',radioSchema);

module.exports = mongoose.model('radios');
