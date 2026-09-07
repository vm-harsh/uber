import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import { UserContext } from './UserProvider.jsx';

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const { serverURL } = useContext(UserContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!serverURL) {
      return undefined;
    }

    const socketInstance = io(serverURL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [serverURL]);

  const sendMessageToEvent = (eventName, payload) => {
    if (!socket) {
      console.warn('Socket is not ready yet.');
      return false;
    }
    socket.emit(eventName, payload);
    return true;
  };

  const receiveMessageFromEvent = (eventName, callback) => {
    if (!socket || typeof callback !== 'function') {
      return () => {};
    }

    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  };

  const value = useMemo(
    () => ({
      socket,
      sendMessageToEvent,
      receiveMessageFromEvent,
    }),
    [socket],
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
