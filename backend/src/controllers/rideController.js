const getFare = require('../services/rideService');
const mapService = require('../services/mapServices');
const {validationResult} = require('express-validator');
const rideService = require('../services/rideService');
const {sendMessageToSocket} = require('../socket');
const rideModel = require('../models/rideModel');

module.exports.createRideController = async (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(404).json({'message':error.array()});
  }
  const {pickup,destination,vehicleType} = req.body;
  try {
    const ride = await rideService.createRide({
      user:req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const pickUpCoordinates = await mapService.getAddressCoordinates(pickup);


    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickUpCoordinates.lat,pickUpCoordinates.lng, 10);

    const rideWithUser = await rideModel.findById(ride._id).populate('user');

    captainsInRadius.forEach((captain) => {
      if (!captain.socketId) {
        return;
      }

      sendMessageToSocket(captain.socketId, {
        type: "new-ride",
        ride: rideWithUser
      });
    });

    return res.status(201).json(ride);


  } catch (error) {
    if (res.headersSent) {
      console.error('Error after response was sent:', error.message);
      return;
    }
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

module.exports.confirmRideController = async (req,res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(404).json({'message':error.array()});
  }

  const {rideId} = req.body;
  

  try {
    const ride = await rideService.confirmRide({rideId, captain: req.captain});
    const rideWithOtp = await rideModel.findById(ride._id).select('+otp').populate('user').populate('captain');

    if (rideWithOtp?.user?.socketId) {
      sendMessageToSocket(rideWithOtp.user.socketId, {
      type: "ride-confirmed",
      ride: rideWithOtp
      });
    }

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(400).json({message:error.message});
  }

}

module.exports.startRideController = async (req, res) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(404).json({'message':error.array()});
  }

  const { rideId, otp } = req.body;

  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

    if (ride.user?.socketId) {
      sendMessageToSocket(ride.user.socketId, {
        type: 'ride-started',
        ride,
      });
    }

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


