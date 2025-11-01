const rideServices = require('../services/rideService');
const {validationResult} = require('express-validator');

module.exports.createRideController = async (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(404).json({'message':error.array()});
  }
  const {pickup,destination,vehicleType} = req.body;
  try {
    const ride = await rideServices.createRide({
      user:req.user._id,
      pickup,
      destination,
      vehicleType
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({message:error.message});
  }


}



