const rideModel = require('../models/rideModel');
const mapServices = require('./mapServices');
const crypto = require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  let distanceTime;
  try {
    distanceTime = await mapServices.getDistanceAndTime(pickup, destination);
  } catch (err) {
    console.warn('Map service distance estimate error, using default calculation:', err.message);
    distanceTime = { distance: 10, duration: 25 };
  }

  const perKmRates = { auto: 10, car: 15, bike: 8 };
  const perMinRates = { car: 3, bike: 1.5 };
  const minFares = { auto: 30, car: 50, bike: 20 };

  const fares = {
    auto: Math.max(minFares.auto, distanceTime.distance * perKmRates.auto),
    car: Math.max(minFares.car, (distanceTime.distance * perKmRates.car) + (distanceTime.duration * perMinRates.car)),
    bike: Math.max(minFares.bike, (distanceTime.distance * perKmRates.bike) + (distanceTime.duration * perMinRates.bike))
  };

  // Round each value to 2 decimals
  const formattedFares = {
    auto: Number(fares.auto).toFixed(2),
    car: Number(fares.car).toFixed(2),
    bike: Number(fares.bike).toFixed(2)
  };

  return formattedFares;
}

module.exports = getFare;


function getOTP(num){
  const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
  return otp;
}

module.exports.createRide = async({user,pickup,destination,vehicleType}) => {
  if(!user || !pickup || !destination || !vehicleType){
    throw new Error('All fields are required');
  }
  const fare = await getFare(pickup,destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp:getOTP(6),
    fare: fare[vehicleType],
  })

  return ride;
} 

module.exports.confirmRide = async({rideId, captain}) => {
  if(!rideId){
    throw new Error('rideId is required');
  }

  await rideModel.findOneAndUpdate({_id:rideId},{status:'accepted',captain: captain._id});

  const ride = await rideModel
    .findById(rideId)
    .populate('user')
    .populate('captain');

  if(!ride){
    throw new Error('Ride not found');
  }

  return ride;
}

module.exports.startRide = async ({ rideId, captain, otp }) => {
  if (!rideId || !otp) {
    throw new Error('rideId and otp are required');
  }

  const ride = await rideModel.findById(rideId).select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (!ride.captain || ride.captain.toString() !== captain._id.toString()) {
    throw new Error('You are not assigned to this ride');
  }

  if (ride.status !== 'accepted' && ride.status !== 'pending') {
    throw new Error('Ride is not ready to start');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  ride.status = 'ongoing';
  await ride.save();

  const updatedRide = await rideModel
    .findById(rideId)
    .populate('user')
    .populate('captain');

  return updatedRide;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('rideId is required');
  }

  const ride = await rideModel.findById(rideId);

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (!ride.captain || ride.captain.toString() !== captain._id.toString()) {
    throw new Error('You are not authorized to end this ride');
  }

  if (ride.status !== 'ongoing' && ride.status !== 'accepted') {
    throw new Error('Ride is not ongoing');
  }

  ride.status = 'completed';
  await ride.save();

  const updatedRide = await rideModel
    .findById(rideId)
    .populate('user')
    .populate('captain');

  return updatedRide;
};