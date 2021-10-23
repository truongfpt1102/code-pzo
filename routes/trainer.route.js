var express = require('express');
var router = express.Router();
var controller = require('../controllers/trainer.controller');

router.get('/updateInformation/:username', controller.getUpdateInformation)

router.post('/updateInformation/:username', controller.postUpdateInformation)


router.get('/', controller.index);

module.exports = router;