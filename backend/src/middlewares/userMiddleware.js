const blackListTokenModel = require('../models/blackListedToken');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req,res,next) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  if(!token){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }

  const isBlackListed = await blackListTokenModel.findOne({token});
  if(isBlackListed){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();

  } catch (error) {
     return res.status(401).json({
      message:"Unauthorized"
    })
  }
}

module.exports = isAuthenticated