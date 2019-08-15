const mongoose = require('mongoose');
const diseaseModel = require('../../models/diseases');
const medicineModel = require('../../models/medicines');
const radioModel = require('../../models/radios');
const testModel = require('../../models/tests');
const reportModel = require('../../models/reports');

const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.prototype.valueOf = function () {
    return this.toString();
};

const resolvers = {
    Query: {
        diseases: function (_, _, context) {
            var query = {};
            query.patientId = context.user
            return new Promise(function (resolve, reject) {
                diseaseModel.find(query, (err, userDiseases) => {
                    if (err)
                        console.log(err)
                    console.log(userDiseases)
                    resolve(userDiseases);
                })
            });
        },

        singleDisease: function (_, req, context) {
            console.log(req)
            var query = {};
            query.patientId = new ObjectId(context.user)
            query._id = new ObjectId(req.diseaseId)
            return new Promise(function (resolve, reject) {
                diseaseModel.findOne(query)
                    .populate({
                        path: 'medicineList',
                        model: 'medicines'
                    })
                    .populate({
                        path: 'reportList',
                        model: 'reports'
                    })
                    .populate({
                        path: 'testList',
                        model: 'tests'
                    })
                    .populate({
                        path: 'radioList',
                        model: 'radios'
                    })
                    .exec((err, userDisease) => {
                        if (err)
                            console.log(err)
                        console.log(userDisease)
                        resolve(userDisease);
                    })

            });
        },

        medicines: function (_, req, context) {
            console.log(req)
            var query = {};
            query.patientId = context.user
            query.diseaseId = req.diseaseId
            console.log("query", query)
            return new Promise(function (resolve, reject) {
                medicineModel.find(query, (err, userMedicines) => {
                    if (err)
                        console.log(err)
                    console.log(userMedicines)
                    resolve(userMedicines);
                })
            });
        },

        singleMedicine: function (_, req, context) {
            var query = {};
            query.patientId = context.user
            query._id = new ObjectId(req.medicineId)
            return new Promise(function (resolve, reject) {
                medicineModel.findOne(query, (err, userMedicine) => {
                    if (err)
                        console.log(err)
                    console.log(userMedicine)
                    resolve(userMedicine);
                })
            });
        },

        radios: function (_, req, context) {
            console.log(req)
            var query = {};
            query.patientId = new ObjectId(context.user)
            query.diseaseId = new ObjectId(req.diseaseId)
            return new Promise(function (resolve, reject) {
                radioModel.find(query, (err, userRadios) => {
                    if (err)
                        console.log(err)
                    console.log(userRadios)
                    resolve(userRadios);
                })
            });
        },

        singleRadio: function (_, req, context) {
            var query = {};
            query.patientId = new ObjectId(context.user)
            query._id = new ObjectId(req.radioId)
            return new Promise(function (resolve, reject) {
                radioModel.findOne(query, (err, userRadio) => {
                    if (err)
                        console.log(err)
                    console.log(userRadio)
                    resolve(userRadio);
                })
            });
        },

        reports: function (_, req, context) {
            console.log(req)
            var query = {}
            query.patientId = new ObjectId(context.user)
            query.diseaseId = new ObjectId(req.diseaseId)
            return new Promise(function (resolve, reject) {
                reportModel.find(query, (err, userReports) => {
                    if (err)
                        console.log(err)
                    console.log(userReports)
                    resolve(userReports);
                })
            });
        },

        singleReport: function (_, req, context) {
            console.log(req)
            var query = {}
            query.patientId = new ObjectId(context.user)
            query._id = new ObjectId(req.reportId)
            return new Promise(function (resolve, reject) {
                reportModel.findOne(query, (err, userReports) => {
                    if (err)
                        console.log(err)
                    console.log(userReports)
                    resolve(userReports);
                })
            });
        },

        tests: function (_, req, context) {
            console.log(req)
            var query = {}
            query.patientId = new ObjectId(context.user)
            query.diseaseId = new ObjectId(req.diseaseId)
            return new Promise(function (resolve, reject) {
                testModel.find(query, (err, userTest) => {
                    if (err)
                        console.log(err)
                    console.log(userTest)
                    resolve(userTest);

                })
            });
        },

        singleTest: function (_, req, context) {
            console.log(req)
            var query = {}

            query.patientId = new ObjectId(context.user)
            query._id = new ObjectId(req.testId)
            return new Promise(function (resolve, reject) {
                testModel.findOne(query, (err, userTest) => {
                    if (err)
                        console.log(err)
                    console.log(userTest)
                    resolve(userTest);

                })
            });
        }


    },

    Mutation: {
        ////////////// add  ///////////////////////////////
        addDisease: function (_, req, context) {
            console.log("add disease")
            var Disease = {};
            Disease.patientId = context.user;
            Disease.name = req.name;
            Disease.category = req.category;
            Disease.subCategory = req.subCategory;
            Disease.doctorName = req.doctorName;
            Disease.startDate = req.startDate;
            Disease.endDate = req.endDate;
            Disease.duration = req.duration;
            Disease.comment = req.comment;

            return new Promise(function (resolve, reject) {
                diseaseModel.create(Disease, (err, userDisease) => {
                    if (err)
                        console.log(err)
                    console.log(userDisease)
                    resolve(userDisease);
                })
            });
        },

        addMedicine: function (_, req, context) {
            var Medicine = {};
            Medicine.patientId = context.user;
            Medicine.diseaseId = req.diseaseId;
            Medicine.name = req.name;
            Medicine.category = req.category;
            Medicine.dose = req.dose;
            Medicine.allergic = req.allergic;
            Medicine.startDate = req.startDate;
            Medicine.endDate = req.endDate;
            Medicine.duration = req.duration;
            Medicine.comment = req.comment;
            Medicine.reason = req.reason;

            console.log("to add", Medicine)
            return new Promise(function (resolve, reject) {
                medicineModel.create(Medicine,
                    (err, userMedicine) => {
                        if (err)
                            console.log(err)
                        console.log("medicine", userMedicine)
                        diseaseModel.updateOne({
                            _id: Medicine.diseaseId
                        }, {
                                "$push": {
                                    "medicineList": userMedicine._id
                                }
                            }, (err, userDisease) => {
                                if (err)
                                    console.log(err)
                                console.log("userDisease", userDisease)

                            })
                        resolve(userMedicine);
                    })
            });
        },

        addRadio: function (_, req, context) {
            console.log(req)
            var Radio = {};
            Radio.patientId = context.user;
            Radio.diseaseId = req.diseaseId;
            Radio.name = req.name;
            Radio.category = req.category;
            Radio.date = req.date;
            Radio.reportImg = req.reportImg;
            Radio.radioImgs = req.radioImgs;
            Radio.comment = req.comment;

            return new Promise(function (resolve, reject) {
                radioModel.create(Radio, (err, userRadio) => {
                    if (err)
                        console.log(err)
                    diseaseModel.updateOne({
                        _id: Radio.diseaseId
                    }, {
                            "$push": {
                                "radioList": userRadio
                            }
                        }, (err, userDisease) => {
                            if (err)
                                console.log(err)
                            console.log("userDisease", userDisease)
                        })
                    resolve(userRadio);
                })
            });
        },

        addReport: function (_, req, context) {
            console.log(req)
            var Report = {};
            Report.patientId = context.user;
            Report.diseaseId = req.diseaseId;
            Report.name = req.name;
            Report.date = req.date;
            Report.doctorName = req.doctorName;
            Report.specialization = req.specialization;
            Report.reportImg = req.reportImg
            Report.comment = req.comment;
            return new Promise(function (resolve, reject) {
                reportModel.create(Report, (err, userReport) => {
                    if (err)
                        console.log(err)
                    console.log(userReport)
                    diseaseModel.updateOne({
                        _id: Report.diseaseId
                    }, {
                            "$push": {
                                "reportList": userReport
                            }
                        }, (err, userDisease) => {
                            if (err)
                                console.log(err)
                            console.log("userDisease", userDisease)
                        })
                    resolve(userReport);

                })
            });
        },

        addTest: function (_, req, context) {
            console.log(req)
            var Test = {};
            Test.patientId = context.user;
            Test.diseaseId = req.diseaseId;
            Test.name = req.name;
            Test.date = req.date;
            Test.category = req.category;
            Test.testImgs = req.testImgs;
            Test.reportImg = req.reportImg
            Test.comment = req.comment;
            return new Promise(function (resolve, reject) {
                testModel.create(Test, (err, userTest) => {
                    if (err)
                        console.log(err)
                    console.log(userTest)
                    diseaseModel.updateOne({
                        _id: Test.diseaseId
                    }, {
                            "$push": {
                                "testList": userTest
                            }
                        }, (err, userDisease) => {
                            if (err)
                                console.log(err)
                            console.log("userDisease", userDisease)
                        })
                    resolve(userTest);

                })
            });
        },


        //////////// update  ///////////////////////////////////
        updateDisease: function (_, req, context) {
            console.log(req)
            var query = {};

            if (req.name)
                query.name = req.name
            if (req.category)
                query.category = req.category
            if (req.subCategory)
                query.subCategory = req.subCategory
            if (req.doctorName)
                query.doctorName = req.doctorName
            if (req.startDate)
                query.startDate = req.startDate
            if (req.endDate)
                query.endDate = req.endDate
            if (req.duration)
                query.duration = req.duration
            if (req.comment)
                query.comment = req.comment

            console.log("query", query)
            return new Promise(function (resolve, reject) {
                diseaseModel.findOneAndUpdate({
                    _id: req.diseaseId,
                    patientId: context.user
                },
                    query,
                    { new: true },
                    (err, userDisease) => {
                        if (err)
                            console.log("err", err)
                        console.log("userDisease", userDisease)
                        resolve(userDisease);
                    })


            });
        },

        updateMedicine: function (_, req, context) {
            console.log(req)
            var query = {};

            if (req.name)
                query.name = req.name
            if (req.category)
                query.category = req.category
            if (req.startDate)
                query.startDate = req.startDate
            if (req.endDate)
                query.endDate = req.endDate
            if (req.duration)
                query.duration = req.duration
            if (req.dose)
                query.dose = req.dose
            if (req.allergic)
                query.allergic = req.allergic
            if (req.reason)
                query.reason = req.reason
            if (req.comment)
                query.comment = req.comment

            return new Promise(function (resolve, reject) {
                medicineModel.findOneAndUpdate({
                    _id: req.medicineId,
                    patientId: context.user
                },
                    query,
                    { new: true },
                    (err, userMedicine) => {
                        if (err)
                            console.log(err)
                        console.log("userMedicine", userMedicine)
                        resolve(userMedicine);
                    })


            });
        },

        updateRadio: function (_, req, context) {
            console.log(req)
            var query = {};

            if (req.name)
                query.name = req.name
            if (req.category)
                query.category = req.category
            if (req.date)
                query.date = req.date
            if (req.reportImg)
                query.reportImg = req.reportImg
            if (req.radioImgs)
                query.radioImgs = req.radioImgs
            if (req.comment)
                query.comment = req.comment

            return new Promise(function (resolve, reject) {
                radioModel.findOneAndUpdate({
                    _id: req.radioId,
                    patientId: context.user
                },
                    query,
                    { new: true },
                    (err, userRadio) => {
                        if (err)
                            console.log(err)
                        console.log("userRadio", userRadio)
                        resolve(userRadio);
                    })


            });

        },

        updateReport: function (_, req, context) {
            console.log(req)
            var query = {};

            if (req.name)
                query.name = req.name
            if (req.date)
                query.date = req.date
            if (req.doctorName)
                query.doctorName = req.doctorName
            if (req.specialization)
                query.specialization = req.specialization
            if (req.reportImg)
                query.reportImg = req.reportImg
            if (req.comment)
                query.comment = req.comment

            return new Promise(function (resolve, reject) {
                reportModel.findOneAndUpdate({
                    _id: req.reportId,
                    patientId: context.user
                },
                    query,
                    { new: true },
                    (err, userReport) => {
                        if (err)
                            console.log(err)
                        console.log("userReport", userReport)
                        resolve(userReport);

                    })

            });
        },

        updateTest: function (_, req, context) {
            console.log(req)
            var query = {};

            if (req.name)
                query.name = req.name
            if (req.category)
                query.category = req.category
            if (req.date)
                query.date = req.date
            if (req.reportImg)
                query.reportImg = req.reportImg
            if (req.testImgs)
                query.testImgs = req.testImgs
            if (req.comment)
                query.comment = req.comment

            return new Promise(function (resolve, reject) {
                testModel.findOneAndUpdate({
                    _id: req.testId,
                    patientId: context.user
                },
                    query,
                    { new: true },
                    (err, userTest) => {
                        if (err)
                            console.log(err)
                        console.log("userTest", userTest)
                        resolve(userTest);

                    })

            });
        },


        //////////////////// delete //////////////////////////////////

        deleteDisease: function (_, req, context) {

            return new Promise(function (resolve, reject) {
                diseaseModel.findOneAndDelete({
                    _id: req.diseaseId,
                    patientId: context.user
                }, (err, userDisease) => {
                    if (err || !userDisease)
                        reject("Enter valid Disease Id !")
                    resolve(userDisease);
                })

            })
                .then(function (userDisease) {
                    if (userDisease.medicineList.length > 0) {
                        medicineModel.deleteMany({
                            diseaseId: req.diseaseId,
                            patientId: context.user
                        }, (err, userMedicine) => {
                            if (err || !userMedicine)
                                return ("can't delete related medicines")
                        })
                    }
                    if (userDisease.reportList.length > 0) {
                        reportModel.deleteMany({
                            diseaseId: req.diseaseId,
                            patientId: context.user
                        }, (err, userReport) => {
                            if (err || !userReport)
                                return ("can't delete related reports")
                        })
                    }
                    if (userDisease.testList.length > 0) {
                        testModel.deleteMany({
                            diseaseId: req.diseaseId,
                            patientId: context.user
                        }, (err, userTest) => {
                            if (err || !userTest)
                                return ("can't delete related tests")
                        })
                    }
                    if (userDisease.radioList.length > 0) {
                        radioModel.deleteMany({
                            diseaseId: req.diseaseId,
                            patientId: context.user
                        }, (err, userRadio) => {
                            if (err || !userRadio)
                                return ("can't delete related radios")
                        })
                    }
                    return "disease deleted successfully"
                })
        },

        deleteMedicine: function (_, req, context) {
            console.log(req)

            return new Promise(function (resolve, reject) {
                medicineModel.findOneAndDelete({
                    _id: req.medicineId,
                    patientId: context.user
                }, (err, userMedicine) => {
                    if (err || !userMedicine)
                        reject("Enter valid Medicine Id !")
                    resolve(userMedicine);
                })
            })
                .then(function (userMedicine) {
                    diseaseModel.findOneAndUpdate({
                        _id: userMedicine.diseaseId
                    }, {
                            "$pull": {
                                "medicineList": req.medicineId
                            }
                        },
                        { new: true },
                        (err, userDisease) => {
                            if (err || !userDisease)
                                return ("can't delete medicine from medicine list in disease")
                        })
                    return ("medicine deleted successfully");
                })
        },

        deleteRadio: function (_, req, context) {

            return new Promise(function (resolve, reject) {
                radioModel.findOneAndDelete({
                    _id: req.radioId,
                    patientId: context.user
                }, (err, userRadio) => {
                    if (err || !userRadio)
                        reject("Enter valid Radio Id !")
                    resolve(userRadio);
                })
            })
                .then(function (userRadio) {
                    diseaseModel.findOneAndUpdate({
                        _id: userRadio.diseaseId
                    }, {
                            "$pull": {
                                "radioList": req.radioId
                            }
                        },
                        { new: true },
                        (err, userDisease) => {
                            if (err || !userDisease)
                                return ("can't delete radio from radio list in disease")
                        })
                    return ("radio deleted successfully");
                })
        },

        deleteReport: function (_, req, context) {

            return new Promise(function (resolve, reject) {
                reportModel.findOneAndDelete({
                    _id: req.reportId,
                    patientId: context.user
                }, (err, userReport) => {
                    if (err || !userReport)
                        reject("Enter valid report Id !")
                    resolve(userReport);
                })
            })
                .then(function (userReport) {
                    diseaseModel.findOneAndUpdate({
                        _id: userReport.diseaseId
                    }, {
                            "$pull": {
                                "reportList": req.reportId
                            }
                        },
                        { new: true },
                        (err, userDisease) => {
                            if (err || !userDisease)
                                return ("can't delete report from report list in disease")
                        })
                    return ("report deleted successfully");
                })
        },

        deleteTest: function (_, req, context) {

            return new Promise(function (resolve, reject) {
                testModel.findOneAndDelete({
                    _id: req.testId,
                    patientId: context.user
                }, (err, userTest) => {
                    if (err || !userTest)
                        reject("Enter valid test Id !")
                    resolve(userTest);
                })
            })
                .then(function (userTest) {
                    diseaseModel.findOneAndUpdate({
                        _id: userTest.diseaseId
                    }, {
                            "$pull": {
                                "testList": req.testId
                            }
                        },
                        { new: true },
                        (err, userDisease) => {
                            if (err || !userDisease)
                                return ("can't delete test from test list in disease")
                        })
                    return ("test deleted successfully");
                })
        },
    }


}



module.exports.Resolvers = resolvers;

