const captainModel = require('../models/captainModel');

const createCaptain = async ({firstname,lastname,email,password,color,plate,capacity,vehicleType}) => {
  try {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
      throw new Error("All fields are required");
    }
    const captain = await  captainModel.create({
      fullname:{
        firstname,lastname
      },
      email,
      password,
      vehicle:{
        color,
        plate,
        capacity,
        vehicleType
      }
    })
    return captain;
  } catch (error) {
    console.log("Captain creation Error: ",error)
  }
}

module.exports = createCaptain;