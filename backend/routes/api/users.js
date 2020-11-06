const express = require("express");
const controller = require('../../controllers/user');
const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/',controller.getIndex);

module.exports = router;