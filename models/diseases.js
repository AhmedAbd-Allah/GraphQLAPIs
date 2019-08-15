const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const diseaseSchema = new Schema({
  patientId : {
    type : ObjectId,
    ref : "users"
  },
  medicineList : {
    type : [Object],
    ref : "medicines"
  },
  reportList : {
    type : [Object],
    ref : "reports"
  },
  testList : {
    type : [ObjectId],
    ref : "tests"
  },
  radioList : {
    type : [ObjectId],
    ref : "radios"
  },
  name : String,
  category : String,
  subCategory : String,
  doctorName : String,
  startDate : String,
  endDate : String,
  duration : String,
  comment : String
});

mongoose.model('diseases',diseaseSchema);

module.exports = mongoose.model('diseases');
