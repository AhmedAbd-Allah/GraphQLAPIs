const schema = `
# Disease type
type Disease {
  id:ID
  patientId : ID
  medicineList : [Medicine]
  reportList : [Report]
  testList :[Test]
  radioList : [Radio]
  name : String
  category : String
  subCategory : String
  doctorName : String
  startDate : String
  endDate : String
  duration : String
  comment : String
}

# Medicine type
type Medicine {
  id:ID
  diseaseId: ID
  name : String
  category : String
  startDate : String
  endDate : String
  duration : String
  dose : String
  allergic : String
  reason : String
  comment : String
}

#Test type
type Test {
id:ID
diseaseId : ID
name : String
category : String
date : String
reportImg : String
testImgs : [String]
comment : String
}

#Radio type
type Radio {
  id:ID
  diseaseId : ID
  name : String
  category : String
  date : String
  reportImg : String
  radioImgs : [String]
  comment : String
}

# Report type
type Report {
  id:ID
  diseaseId: ID
  name: String,
  date: String,
  doctorName: String,
  specialization: String,
  reportImg : String,
  comment: String
}

type Query {
  diseases: [Disease]
  medicines(diseaseId:ID!): [Medicine]
  reports(diseaseId:ID!): [Report]
  radios(diseaseId:ID!): [Radio]
  tests(diseaseId:ID!): [Test]
  singleDisease(diseaseId: ID!): Disease
  singleMedicine(medicineId: ID!): Medicine
  singleReport(reportId: ID!): Report
  singleRadio(radioId: ID!): Radio
  singleTest(testId: ID!): Test
}

type Mutation {
  addDisease(
    name : String
    category : String
    subCategory : String
    doctorName : String
    startDate : String
    endDate : String
    duration : String
    comment : String): Disease

  addMedicine(
    diseaseId: ID!
    name : String
    category : String
    startDate : String
    endDate : String
    duration : String
    dose : String
    allergic : String
    reason : String
    comment : String): Medicine

  addReport(
    diseaseId: ID!
    name: String,
    date: String,
    doctorName: String,
    specialization: String,
    reportImg : String,
    comment: String): Report

  addRadio(
    diseaseId : ID!
    name : String
    category : String
    date : String
    reportImg : String
    radioImgs : [String]
    comment : String): Radio

  addTest(
    diseaseId : ID!
    name : String
    category : String
    date : String
    reportImg : String
    testImgs : [String]
    comment : String): Test

  updateDisease(diseaseId : ID!
    name : String
    category : String
    subCategory : String
    doctorName : String
    startDate : String
    endDate : String
    duration : String
    comment : String): Disease

  updateMedicine(medicineId : ID!
    name : String
    category : String
    startDate : String
    endDate : String
    duration : String
    dose : String
    allergic : String
    reason : String
    comment : String): Medicine

  updateRadio(radioId: ID!
    name : String
    category : String
    date : String
    reportImg : String
    radioImgs : [String]
    comment : String): Radio

  updateReport(reportId: ID!
    name: String,
    date: String,
    doctorName: String,
    specialization: String,
    reportImg : String,
    comment: String): Report

  updateTest(testId: ID!
    name : String
    category : String
    date : String
    reportImg : String
    testImgs : [String]
    comment : String): Test

  deleteDisease(diseaseId: ID!) : String
  deleteMedicine(medicineId: ID!) : String
  deleteRadio(radioId: ID!) : String
  deleteReport(reportId: ID!) : String
  deleteTest(testId: ID!) : String











    
}

`;

module.exports.Schema = schema;



// medicineList :Medicine
// reportList : Report
// testList :Test
// radioList : Radio