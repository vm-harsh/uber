const blackListTokenModel = require('../models/blackListedToken');
const userModel = require('../models/userModel');
const createUser = require('../services/userService')
const {validationResult} = require('express-validator')

const registerUser = async (req,res) => {

  const  error = validationResult(req); 
  if(!error.isEmpty()){
    return res.status(400).json({message:error.array()})
  }

  const {fullname,email,password} = req.body;
  
  const hashPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashPassword
  })

  const token = user.generateAuthToken();
  res.cookie('token',token);

  res.status(201).json(user);
}


const loginUser = async (req,res) => {

  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(400).json({
      message:error.array()
    })
  }

  const {email,password} = req.body;

  const user = await userModel.findOne({email}).select('+password');

  if(!user){
    return res.status(401).json({
      message:"Invalid Email or Password"
    })
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
     return res.status(401).json({
      message:"Invalid Email or Password"
    })
  }

  const token = user.generateAuthToken();
  res.cookie('token',token);

  res.status(200).json(user);
}

const getUserProfile = async (req,res) => {
  const {user} = req;
  return res.status(200).json(user);
}


const logoutUser = async (req,res) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  await blackListTokenModel.create({token});
  return res.status(200).json({message:"Logged out successfully"});
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
}