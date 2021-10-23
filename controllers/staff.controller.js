var Account = require("../models/account.model");
var Staff = require("../models/staff.model");
var Trainer = require("../models/trainer.model");
var Course = require("../models/course.model");
var CourseCategory = require("../models/courseCategory.model")
var TrainerToCourse = require("../models/trainerToCourse.model");


module.exports = {
    //Account=============================================================
    viewAccount: async function (req, res) {
        res.render('staff/viewAccount', {
            accountAdmin: await Account.find({ role: 'admin' }),
            accountStaff: await Account.find({ role: 'staff' }),
            accountTrainer: await Account.find({ role: 'trainer' }),
        });
    },

    getCreateAccountTrainer: function (req, res) {
        res.render('staff/createAccountTrainer');
    },

    postCreateAccountTrainer: function (req, res) {
        const account = new Account(req.body);
        account.save();
        const trainer = new Trainer(req.body);
        trainer.save();
        console.log(req.body)
        res.redirect('viewAccount');

    },

  

    getUpdateAccountTrainer: async function (req, res) {
        var username = req.params.username;
        var account = await Account.findOne({ username: username })
        var trainer = await Trainer.findOne({ username: username })

        res.render('staff/updateAccountTrainer', {
            account: account,
            trainer: trainer
        });
    },

    postUpdateAccountTrainer: async function (req, res) {
        var username = req.params.username;
        await Account.updateOne({ username: username }, req.body)
        await Trainer.updateOne({ username: username }, req.body)

        await Account.updateOne({ username: username }, req.body)
        res.redirect('/staff/viewAccount');

    },



    deleteAccount: async function (req, res) {
        var username = req.params.username;
        await Account.deleteOne({ username: username });
        await Trainer.deleteOne({ username: username });
        res.redirect('/staff/viewAccount');
    },


    //Course Category======================================================
    viewCourseCategory: async function (req, res) {
        var category = await CourseCategory.find({});
        res.render('staff/viewCourseCategory', {
            categorys: category
        });
    },

    getCreateCourseCategory: function (req, res) {
        res.render('staff/createCourseCategory')
    },

    postCreateCourseCategory: function (req, res) {
        const courseCategory = new CourseCategory(req.body);
        courseCategory.save();
        res.redirect('viewCourseCategory');
    },
    deleteCourseCategory: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        await CourseCategory.deleteOne(condition);
        res.redirect('/staff/viewCourseCategory');
        console.log(id);
    },
    updateCourseCategory: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        var courseCategory = await CourseCategory.findOne(condition)
        res.render('staff/updateCourseCategory', {
            courseCategorys: courseCategory
        });
    },
    POSTupdateCourseCategory: async function (req, res) {
        var id = req.params.id;
        var category = req.body.category;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        await courseCategory.updateOne(condition, req.body)
        res.redirect('/staff/viewCourseCategory');
    },

    //Course================================================================

    viewCourse: async function (req, res) {
        var category = req.params.category;
        var course = await Course.find({ courseCategory: category });
        res.render('staff/viewCourse', {
            courses: course,
            category: category
        });
    },

    viewCourseDetail: async function (req, res) {
        var course = req.params.detail;
        var view = await TrainerToCourse.find({ courseName: course });
        res.render('staff/viewCourseDetail', {
            views: view
        });
    },

    getCreateCourse: function (req, res) {
        var category = req.params.category;
        res.render('staff/createCourse', {
            category: category
        });
    },
    postCreateCourse: function (req, res) {
        var category = req.body.courseCategory;
        const course = new Course(req.body);
        course.save();
        res.redirect('/staff/viewCourse/' + category);
    },

    deleteCourse: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        await Course.deleteOne(condition);
        res.redirect('/staff/viewCourseCategory');
    },

    getUpdateCourse: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        var course = await Course.findOne(condition)
        res.render('staff/updateCourse', {
            course: course
        });
    },
    postUpdateCourse: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        await Course.updateOne(condition, req.body)
        res.redirect('/staff/viewCourse/' + req.body.courseCategory);
    },



    // Assign trainer to Course===========================================================
    viewTrainerToCourse: async function (req, res) {
        var viewTrainer = await TrainerToCourse.find();
        res.render('staff/viewTrainer', {
            viewTrainers: viewTrainer
        });
    },

    addTrainer: async function (req, res) {
        var course = await Course.find({});
        var trainer = await Account.find({ role: "trainer" });
        res.render('staff/trainerCourse', {
            courses: course, trainers: trainer
        });
    },
    postAddTrainer: function (req, res) {
        const trainerToCourse = new TrainerToCourse(req.body);
        trainerToCourse.save();
        res.redirect('viewTrainer');
    },
    deleteTrainer: async function (req, res) {
        var id = req.params.id;
        var ObjectID = require('mongodb').ObjectID(id);
        let condition = { '_id': ObjectID };
        await TrainerToCourse.deleteOne(condition);
        res.redirect('/staff/viewTrainer');
    },

    getUpdateInformation: async function (req, res) {
        var username = req.params.username;
        var account = await Account.findOne({ username: username });
        var staff = await Staff.findOne({ username: username });
        res.render('staff/updateInformation', {
            account: account,
            staff: staff
        })
    },

    postUpdateInformation: async function (req, res) {
        var username = req.params.username;

        await Account.updateOne({ username: username }, req.body);
        await Staff.updateOne({ username: username }, req.body);
        res.redirect('/staff')
    },

    //Home Page================================================================
    index: function (req, res) {
        res.render('staff/index');
    },
};