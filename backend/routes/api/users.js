const express = require("express");
const controller = require('../../controllers/user');
const passport = require('passport');
const router = express.Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/',controller.getIndex);

router.post('/delete',passport.authenticate('jwt',{session:false}), controller.postDelete);

module.exports = router;