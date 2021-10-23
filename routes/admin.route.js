var express = require('express');
var router = express.Router();
var controller = require('../controllers/admin.controller');
var validate = require('../validate/admin.validate')
// var authMiddleware = require('../middlewares/auth.middleware')

//Account
router.get('/viewAccountAdmin', controller.viewAccountAdmin);

router.get('/viewAccountStaff', controller.viewAccountStaff);

router.get('/createAccountAdmin', controller.getCreateAccountAdmin);

router.post('/createAccountAdmin', validate.postCreateAccountAdmin, controller.postCreateAccountAdmin);

router.get('/createAccountStaff', controller.getCreateAccountStaff);

router.post('/createAccountStaff', validate.postCreateAccountStaff, controller.postCreateAccountStaff);


router.get('/deleteAccountAdmin/:username', controller.deleteAccountAdmin);

router.get('/deleteAccountStaff/:username', controller.deleteAccountStaff);

router.get('/updateAccountAdmin/:username', controller.getUpdateAccountAdmin);

router.post('/updateAccountAdmin/:username', controller.postUpdateAccountAdmin);

router.get('/updateAccountStaff/:username', controller.getUpdateAccountStaff);

router.post('/updateAccountStaff/:username', controller.postUpdateAccountStaff);


router.get('/', controller.index);

module.exports = router;