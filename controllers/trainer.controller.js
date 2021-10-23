var Account = require("../models/account.model");
var Trainer = require("../models/trainer.model");
var TrainerToCourse = require("../models/trainerToCourse.model");

module.exports = {
    
    getUpdateInformation: async function (req, res) {
        var username = req.params.username;
        var account = await Account.findOne({username: username});
        var trainer = await Trainer.findOne({username: username});
        res.render('trainer/updateInformation', {
            account: account,
            trainer: trainer
        })
    },

    postUpdateInformation: async function (req, res) {
        var username = req.params.username;

        await Account.updateOne({username: username}, req.body);
        await Trainer.updateOne({username: username}, req.body);
        res.redirect('/trainer')
    },

    //Home Page================================================================
    index: async function (req, res) {
        var account = await Account.findOne({'_id': req.cookies.accountId});
        var view = await TrainerToCourse.find({trainer: account.name});
        res.render('trainer/index', {
            views: view
        });
        console.log(account)
    },
};