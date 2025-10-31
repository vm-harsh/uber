const express = require('express')
const {userAuth} = require('../middlewares/authMiddleware');
const {getCoordinates,getDistanceAndTimeController} = require('../controllers/mapConrtoller');
const router = express.Router()
const {query} = require('express-validator');



router.get('/get-coordinates',
  query('address').isString().isLength({min:3}),
  userAuth,getCoordinates);


module.exports = router