const express = require('express');
const passport = require('passport');
const adminController = require('../../controllers/admin');
const router = express.Router();

router.get('/',  adminController.getIndex);

router.get('/add-service', passport.authenticate('jwt',{session:false}), adminController.getAddService);

router.get('/edit-service/:serviceId', passport.authenticate('jwt',{session:false}), adminController.getEditService);

router.post('/add-service', passport.authenticate('jwt',{session:false}), adminController.postService);

router.post('/edit-service', passport.authenticate('jwt',{session:false}), adminController.postEditService);

router.get('/:serviceId', adminController.getService);

router.post('/delete',passport.authenticate('jwt',{session:false}), adminController.postDelete);

module.exports = router;