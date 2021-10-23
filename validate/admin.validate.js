var Account = require("../models/account.model");
module.exports = {
    // Create=====================================================================================================================
    postCreateAccountAdmin: async function (req, res, next) {
        var username = req.body.username
        var account = await Account.findOne({ username: username });
        console.log(account);
        console.log(username);
        var error = [];
        if (!req.body.name) {
            error.push('Name is required!')
        }
        if (!req.body.username) {
            error.push('Username is required!')
        }
        if (account) {
            error.push('Account already exists')
        }
        if (!req.body.password) {
            error.push('Password is required!')
        }
        if (error.length) {
            res.render('admin/createAccountAdmin', {
                errors: error,
                values: req.body
            });
            return;
        }
        next();
    },
    postCreateAccountStaff: async function (req, res, next) {
        var username = req.body.username
        var account = await Account.findOne({ username: username });
        console.log(account);
        console.log(username);
        var error = [];
        if (!req.body.name) {
            error.push('Name is required!')
        }
        if (!req.body.username) {
            error.push('Username is required!')
        }
        if (account) {
            error.push('Account already exists')
        }
        if (!req.body.password) {
            error.push('Password is required!')
        }
        if (error.length) {
            res.render('admin/createAccountStaff', {
                errors: error,
                values: req.body
            });
            return;
        }
        next();
    },
    postCreateAccountTrainer: async function (req, res, next) {
        var username = req.body.username
        var account = await Account.findOne({ username: username });
        console.log(account);
        console.log(username);
        var error = [];
        if (!req.body.name) {
            error.push('Name is required!')
        }
        if (!req.body.username) {
            error.push('Username is required!')
        }
        if (account) {
            error.push('Account already exists')
        }
        if (!req.body.password) {
            error.push('Password is required!')
        }
        if (error.length) {
            res.render('admin/createAccountTrainer', {
                errors: error,
                values: req.body
            });
            return;
        }
        next();
    },
   
    
}