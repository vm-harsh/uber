const userModel = require('./models/userModel');
const captainModel = require('./models/captainModel');
const rideModel = require('./models/rideModel');

let io = null;

function initializeSocket(server) {
  try {
    const { Server } = require('socket.io');

    io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join', async (data) => {
        const {userId, userType} = data;

        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }




      });

      socket.on('update-location-captain', async (data) => {
        const { userId, location, rideId } = data;

        if(!location || !location.lat || !location.lng){
            return socket.emit('error', { message: 'Invalid location data' });
        }

        await captainModel.findByIdAndUpdate(userId, { location:{
            lat:location.lat,
            lng:location.lng
        } });

        if (rideId) {
          const ride = await rideModel.findById(rideId).populate('user');

          if (ride?.user?.socketId) {
            io.to(ride.user.socketId).emit('captain-location-updated', {
              rideId,
              location,
            });
          }
        }
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });

    return io;
  } catch (error) {
    console.error('Socket initialization failed. Install socket.io to enable realtime messaging.');
    return null;
  }
}

function sendMessageToSocket(socketId, messageObject) {
  if (!io || !socketId) {
    console.warn('Socket server is not initialized.');
    return false;
  }

  io.to(socketId).emit(`${messageObject.type}`, messageObject.ride);
  return true;
}

module.exports = {
  initializeSocket,
  sendMessageToSocket,
};
