const express = require('express');
const {body} = require('express-validator');
const registerCaptain = require('../controllers/captainController');

const router = express.Router();

router.post('/register',[
  body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 character long'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long'),
  body('vehicle.color').isLength({min:3}).withMessage('Vehicle color must be atleast 3 character long'),
  body('vehicle.plate').isLength({min:3}).withMessage('Vehicle plate must be atleast 3 character long'),
  body('vehicle.capacity').isInt({min:1}).withMessage('Vehicle capacity must be atleast 1'),
  body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Vehicle type must be car, bike or auto')
],registerCaptain);


module.exports = router;