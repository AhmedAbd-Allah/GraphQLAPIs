const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const testSchema = new Schema({
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
  testImgs : [String],
  comment : String
});

mongoose.model('tests',testSchema);

module.exports = mongoose.model('tests');
