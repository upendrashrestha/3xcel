const express = require('express');
const controller = require('../../controllers/email');
const router = express.Router();

router.post('/',  controller.sendEmail);

module.exports = router;