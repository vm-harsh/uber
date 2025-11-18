const getFare = require('../services/rideService');
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


module.exports.getFareController = async (req,res) => {
  try {
    const {pickUp,destination} = req.body;
    if(!pickUp || !destination){
      return res.status(404).json({message:"Invalid Locations"});
    }
    const fares = await getFare(pickUp,destination);
    
    res.status(200).json(fares);
    
  } catch (error) {
    res.status(500).json({
      message:"Internal Server Error"+error
    })
  }
}


