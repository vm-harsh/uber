const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const {createRideController, getFareController, confirmRideController, startRideController, endRideController} = require('../controllers/rideController');
const { userAuth, captainAuth } = require('../middlewares/authMiddleware');


router.post('/create',userAuth,[
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['auto','bike','car']).withMessage('Invalid vehicleType'),
],createRideController)


router.post('/get-fare',userAuth,[
  body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
],getFareController);

router.post('/confirm',captainAuth,[
  body('rideId').isString().isLength({min:24,max:24}).withMessage('Invalid rideId')
],confirmRideController);

router.post('/start-ride',captainAuth,[
  body('rideId').isString().isLength({min:24,max:24}).withMessage('Invalid rideId'),
  body('otp').isString().isLength({min:4,max:6}).withMessage('Invalid OTP')
],startRideController);

router.post('/end-ride',captainAuth,[
  body('rideId').isString().isLength({min:24,max:24}).withMessage('Invalid rideId')
],endRideController);

module.exports = router