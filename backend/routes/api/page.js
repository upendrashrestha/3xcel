const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/page');
const router = express.Router();

router.get('/',  controller.getIndex);

router.get('/add-page', passport.authenticate('jwt',{session:false}), controller.getAddModel);

router.get('/edit-page/:id', passport.authenticate('jwt',{session:false}), controller.getEditModel);

router.post('/add-page', passport.authenticate('jwt',{session:false}), controller.postModel);

router.post('/edit-page', passport.authenticate('jwt',{session:false}), controller.postEditModel);

//router.get('/:id', controller.getModel);

router.get('/:code', controller.getModelByCode);

router.post('/delete',passport.authenticate('jwt',{session:false}), controller.postDelete);

module.exports = router;