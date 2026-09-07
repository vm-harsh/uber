import React, { useRef, useState, useEffect, useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePanelPopUp from "../components/ConfirmRidePanelPopUp";
import { SocketContext } from "../context/SocketProvider";
import { CaptainContext } from "../context/CaptainProvider";
import { UserContext } from "../context/UserProvider";
import axios from "axios";

const CaptainHome = () => {
  const [isRidePopUpOpen, setIsRidePopUpOpen] = useState(false);
  const [isConfirmRidePopUpOpen, setIsConfirmRidePopUpOpen] = useState(false);
  
  const isRidePopUpRef = useRef(null);
  const isConfirmRidePopUpRef = useRef(null);  

  const { sendMessageToEvent, receiveMessageFromEvent } = useContext(SocketContext);
  const { captain } = useContext(CaptainContext);
  const [ride, setRide] = useState(null);
  const { serverURL } = useContext(UserContext);

  useEffect(() => {
    if (!captain?._id) return;

    sendMessageToEvent('join', { userId: captain._id, userType: 'captain' });

    const sendCaptainLocation = () => {
      navigator.geolocation?.getCurrentPosition(({ coords }) => {
        sendMessageToEvent('update-location-captain', {
          userId: captain._id,
          location: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    };

    sendCaptainLocation();
  }, [captain, sendMessageToEvent]);

  useEffect(() => {
    const unsubscribe = receiveMessageFromEvent('new-ride', (data) => {
      setRide(data);
      setIsConfirmRidePopUpOpen(false);
      setIsRidePopUpOpen(true);
    });

    return unsubscribe;
  }, [receiveMessageFromEvent]);

  async function confirmRide() {
    if (!ride?._id) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${serverURL}/api/ride/confirm`, {
        rideId: ride._id,
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Failed to confirm ride');
      }

      setRide(response.data);
      setIsRidePopUpOpen(false);
      setIsConfirmRidePopUpOpen(true);
    } catch (error) {
      console.error('Error confirming ride:', error);
      // Fallback for demo/testing
      setIsRidePopUpOpen(false);
      setIsConfirmRidePopUpOpen(true);
    }
  }

  async function startRide(otp) {
    if (!ride?._id) {
      throw new Error('Ride not found');
    }

    const token = localStorage.getItem('token');
    const response = await axios.post(`${serverURL}/api/ride/start-ride`, {
      rideId: ride._id,
      otp,
    }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('Failed to start ride');
    }

    return response.data;
  }

  useGSAP(() => {
    gsap.to(isRidePopUpRef.current, {
      yPercent: isRidePopUpOpen ? 0 : 105,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [isRidePopUpOpen]);

  useGSAP(() => {
    gsap.to(isConfirmRidePopUpRef.current, {
      yPercent: isConfirmRidePopUpOpen ? 0 : 105,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [isConfirmRidePopUpOpen]);

  return (
    <div className='w-full h-screen relative overflow-hidden bg-gray-100 flex flex-col justify-between'>
      {/* Floating Top Header */}
      <header className='fixed top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-auto'>
        <div className='bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-gray-100 flex items-center gap-2'>
          <img
            src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw'
            alt='Uber Captain'
            className='h-5 w-auto object-contain'
          />
          <span className='text-xs font-black bg-black text-yellow-400 px-1.5 py-0.5 rounded-md uppercase'>
            Driver
          </span>
        </div>

        <Link
          to='/captain/logout'
          title='Logout'
          className='w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors'
        >
          <LuLogOut className='text-lg' />
        </Link>
      </header>

      {/* Map / Illustration Top View */}
      <div className='flex-1 w-full relative'>
        <img
          src='https://imgs.search.brave.com/PGPRil5Jz9rjEuBW1RmTIsQvLLXiS61EU_JCixHhyzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdHJhbnNwb3J0/LXNlcnZpY2UtYXBw/LXRlY2hub2xvZ3kt/aWNvbl8yNDkwOC0y/ODQyNC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA'
          alt='Captain Route Map'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none'></div>
      </div>

      {/* Captain Stats Dashboard Footer */}
      <div className="p-4 z-10">
        <CaptainDetails />
      </div>

      {/* RIDE POPUP BOTTOM SHEET */}
      <div
        ref={isRidePopUpRef}
        className={`fixed bottom-0 left-0 right-0 w-full z-30 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 px-5 pt-3 pb-6 max-w-2xl mx-auto ${
          isRidePopUpOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <RidePopUp 
          ride={ride}
          setIsRidePopUpOpen={setIsRidePopUpOpen}
          confirmRide={confirmRide}
        />
      </div>

      {/* CONFIRM / START RIDE OTP BOTTOM SHEET */}
      <div
        ref={isConfirmRidePopUpRef}
        className={`fixed bottom-0 left-0 right-0 w-full z-40 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 px-5 pt-3 pb-6 max-w-2xl mx-auto ${
          isConfirmRidePopUpOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <ConfirmRidePanelPopUp
          ride={ride}
          startRide={startRide}
          setIsConfirmRidePanelOpen={setIsConfirmRidePopUpOpen}
        />
      </div>
    </div>
  )
}

export default CaptainHome