const express = require('express');
const {body} = require('express-validator');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/register',[
  body('fullname.firstname').isLength({min:3}).withMessage("First name must be at least 3 character long"),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
], registerUser );

router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
], loginUser );

router.get('/profile',isAuthenticated,getUserProfile);

router.get('/logout',isAuthenticated,logoutUser)

module.exports = router;