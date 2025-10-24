const blackListTokenModel = require('../models/blackListedToken');
const captainModel = require('../models/captainModel');
const createCaptain = require('../services/captainService');
const {validationResult} =  require('express-validator');

const registerCaptain = async (req,res) => {

  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      message:error.array()
    })
  }

  const {fullname,email,password,vehicle} = req.body;

  const isExisting = await captainModel.findOne({email});


  if(isExisting){
    res.status(400).json({
      message:"Captain already Exist"
    })
  }

  const hashPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashPassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType:vehicle.vehicleType
  })

  const token = captain.genereateAuthToken();
  res.cookie('token',token);

  return res.status(201).json(captain);

}



const loginCaptain = async (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({
      message:error.array()
    })
  }

  const {email,password} = req.body;

  const captain = await captainModel.findOne({email}).select('+password');

  if(!captain){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const isMatch = await captain.comparePassword(password);

  if(!isMatch){
    return res.status(400).json({
      message:"Invalid email or password"
    })
  }

  const token = captain.generateAuthToken();

  res.cookie('token',token);

  return res.status(200).json(captain);

}

const captainProfile = async (req,res) => {
  return res.status(200).json(req.captain);
}

const logoutCaptain = async (req,res) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  await blackListTokenModel.create({token});
  res.clearCookie('token');
  return res.status(200).json({
    message:"Logged out successfully"
  })
  
}


module.exports = {registerCaptain,loginCaptain,captainProfile,logoutCaptain}