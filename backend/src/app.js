const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')
const mapRoutes = require('./routes/mapRoutes')
const rideRoutes = require('./routes/rideRoutes')

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/user',userRoutes);
app.use('/api/captain',captainRoutes);
app.use('/api/map',mapRoutes);
app.use('/api/ride',rideRoutes);


module.exports = app;