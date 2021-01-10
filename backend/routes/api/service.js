const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/service');
const router = express.Router();

router.get('/',  controller.getIndex);

router.get('/add-service', passport.authenticate('jwt',{session:false}), controller.getAddService);

router.get('/edit-service/:serviceId', passport.authenticate('jwt',{session:false}), controller.getEditService);

router.post('/add-service', passport.authenticate('jwt',{session:false}), controller.postService);

router.post('/edit-service', passport.authenticate('jwt',{session:false}), controller.postEditService);

router.get('/:serviceId', controller.getService);

router.post('/delete',passport.authenticate('jwt',{session:false}), controller.postDelete);

module.exports = router;