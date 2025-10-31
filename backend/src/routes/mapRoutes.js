const express = require('express')
const {userAuth} = require('../middlewares/authMiddleware');
const {getCoordinates,getDistanceAndTimeController} = require('../controllers/mapConrtoller');
const router = express.Router()
const {query} = require('express-validator');



router.get('/get-coordinates',
  query('address').isString().isLength({min:3}),
  userAuth,getCoordinates);

router.get('/get-distance-time',
  [ query('origin').isString().isLength({min:3}),
  query('destination').isString().isLength({min:3})],
  userAuth,getDistanceAndTimeController
)  
module.exports = router