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


module.exports = {
  registerUser,
}