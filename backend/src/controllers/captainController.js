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


module.exports = registerCaptain;