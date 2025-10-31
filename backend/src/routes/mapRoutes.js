const express = require('express')
const {userAuth} = require('../middlewares/authMiddleware');
const {getCoordinates,getDistanceAndTimeController, getAutoCompleteController} = require('../controllers/mapConrtoller');
const router = express.Router()
const {query,body} = require('express-validator');




router.get('/get-coordinates',
  query('address').isString().isLength({min:3}).withMessage('Address must be at least 3 characters long'),
  userAuth,getCoordinates);

router.get('/get-distance-time',
  [ query('origin').isString().isLength({min:3}).withMessage('origin must be at least 3 characters long'),
  query('destination').isString().isLength({min:3}).withMessage('destination must be at least 3 characters long')],
  userAuth,getDistanceAndTimeController
)  

router.post(
  '/get-address-suggestions',
  [
    body('address')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Address must be at least 3 characters long'),
  ],
  userAuth,
  getAutoCompleteController
);

module.exports = router