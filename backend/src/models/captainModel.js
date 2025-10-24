const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const captainSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
      minlength:[3,'First name must be at least 3 character long']
    },
    lastname:{
      type:String,
      minlength:[3,'Last name must be at least 3 character long'],
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
  },
  password:{
    type:String,
    required:true,
    select:false
  },
  socketId:{
    type:String,
  },

  status:{
    type:String,
    enum:['active','inactive'],
    default:'inactive'
  },

  vehicle:{
    color:{
      type:String,
      required:true,
      minlength:[3,'Vehicle color must be at least 3 character long']
    },
    plate:{
      type:String,
      required:true,
      minlength:[3,'Vehicle plate must be at least 3 character long']
    },
    capacity:{
      type:Number,
      required:true,
      min:[1,'Vehicle capacity must be at least 1']
    },
    vehicleType:{
      type:String,
      required:true,
      enum:['car','bike','auto']
    }
  },

  location:{
    lat:{
      type:Number,
    },
    lng:{
      type:Number,
    }
  }

})


captainSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
  return token;
}

captainSchema.methods.comparePassword = async function(password){
  return await bcryptjs.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
  return await bcryptjs.hash(password,10); 
}



const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;