const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const medicineSchema = new Schema({
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
  startDate : String,
  endDate : String,
  duration : String,
  dose : String,
  allergic : String,
  reason : String,
  comment : String
});

mongoose.model('medicines',medicineSchema);

module.exports = mongoose.model('medicines');
