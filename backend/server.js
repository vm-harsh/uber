require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const connectDb = require('./src/db/db');
const { initializeSocket } = require('./src/socket');

const server = http.createServer(app);

initializeSocket(server);


server.listen(process.env.PORT,()=>{
  connectDb();
  console.log("Server is running on port ",process.env.PORT);
})