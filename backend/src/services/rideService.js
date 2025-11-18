const rideModel = require('../models/rideModel');
const mapServices = require('./mapServices');
const crypto = require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapServices.getDistanceAndTime(pickup, destination);

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
    auto: fares.auto.toFixed(2),
    car: fares.car.toFixed(2),
    bike: fares.bike.toFixed(2)
  };

  return formattedFares;
}


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