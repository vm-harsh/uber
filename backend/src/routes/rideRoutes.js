const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const {createRideController, getFareController} = require('../controllers/rideController');
const { userAuth } = require('../middlewares/authMiddleware');


router.post('/create',userAuth,[
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto','bike','car']).withMessage('Invalid vehicleType'),
],createRideController)


router.post('/get-fare',userAuth,[
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
],getFareController);



module.exports = router