const userModel = require('../models/userModel')

const createUser = async ({firstname,lastname,email,password}) => {
  try {
    if(!firstname || !email || !password){
      throw new Error("All fields are required");
    }
    const user = await  userModel.create({
      fullname:{
        firstname,lastname
      },
      email,
      password
    })
    return user;
  } catch (error) {
    console.log("User creation Error: ",error)
  }
}

module.exports = createUser;