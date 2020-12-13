const express = require('express');
const passport = require('passport');
const questionController = require('../../controllers/question');
const router = express.Router();

router.get('/',  questionController.getIndex);

router.get('/add-question', passport.authenticate('jwt',{session:false}), questionController.getAddQuestion);

router.get('/edit-question/:questionId', passport.authenticate('jwt',{session:false}), questionController.getEditQuestion);

router.post('/add-question', passport.authenticate('jwt',{session:false}), questionController.postQuestion);

router.post('/edit-question', passport.authenticate('jwt',{session:false}), questionController.postEditQuestion);

router.get('/:questionId', questionController.getQuestion);

router.post('/delete',passport.authenticate('jwt',{session:false}), questionController.postDelete);

module.exports = router;