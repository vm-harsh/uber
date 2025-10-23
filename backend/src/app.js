const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes')


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/user',userRoutes);


module.exports = app;