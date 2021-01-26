const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/score');
const router = express.Router();

router.get('/',  controller.getIndex);

router.post('/add-score', controller.postModel);

module.exports = router;