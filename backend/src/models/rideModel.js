const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
  captain:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'captain'
  },
  pickup:{
    type:String,
    required:true
  },
  destination:{
    type:String,
    required:true
  },
  fare:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    enum:['pending','accepted','ongoing','completed','cancelled'],
    default:'pending'
  },
  duration:{
    type:Number,
  },
  distance:{
    type:Number,
  },
  otp:{
    type:String,
    required:true,
    select:false
  },
  paymentID:{
    type:String,
  },
  orderID:{
    type:String
  },
  signature:{
    type:String
  }
})



const rideModel = mongoose.model('ride',rideSchema);


module.exports = rideModel