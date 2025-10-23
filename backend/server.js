require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const connectDb = require('./src/db/db');

const server = http.createServer(app);


server.listen(process.env.PORT,()=>{
  connectDb();
  console.log("Server is running on port ",process.env.PORT);
})