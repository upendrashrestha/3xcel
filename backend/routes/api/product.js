const express = require('express');
const passport = require('passport');
const controller = require('../../controllers/product');
const router = express.Router();

router.get('/',  controller.getIndex);

router.get('/add-product', passport.authenticate('jwt',{session:false}), controller.getAddModel);

router.get('/edit-product/:id', passport.authenticate('jwt',{session:false}), controller.getEditModel);

router.post('/add-product', passport.authenticate('jwt',{session:false}), controller.postModel);

router.post('/edit-product', passport.authenticate('jwt',{session:false}), controller.postEditModel);

router.get('/:id', controller.getModel);

router.post('/delete',passport.authenticate('jwt',{session:false}), controller.postDelete);

module.exports = router;