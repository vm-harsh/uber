const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
  token:{
    type:String,
    required:true,
    unique:true
  },
  createAt:{
    type:Date,
    default:Date.now,
    expiresIn:86400
  }
})

const blackListTokenModel = mongoose.model('blackListToken',blackListTokenSchema);

module.exports = blackListTokenModel;