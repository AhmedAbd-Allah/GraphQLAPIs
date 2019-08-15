const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const reportSchema = new Schema({
  patientId : {
    type : ObjectId,
    ref : "users"
  },
  diseaseId: {
    type: ObjectId,
    ref: "diseases"
  },
  name: String,
  date: String,
  doctorName: String,
  specialization: String,
  reportImg : String,
  comment: String
});

mongoose.model('reports', reportSchema);

module.exports = mongoose.model('reports');
