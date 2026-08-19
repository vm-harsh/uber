
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom'
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePanelPopUp from "../components/ConfirmRidePanelPopUp";
import { useEffect } from "react";
import { useContext } from "react";
import { SocketContext } from "../context/SocketProvider";
import { CaptainContext } from "../context/CaptainProvider";
import { UserContext } from "../context/UserProvider";
import axios from "axios";


const CaptainHome = () => {


  const[isRidePopUpOpen,setIsRidePopUpOpen] = useState(false);
  const[isConfirmRidePopUpOpen,setIsConfirmRidePopUpOpen] = useState(false);
  const isRidePopUpRef = useRef(null)
  const isConfirmRidePopUpRef = useRef(null)  
  const {sendMessageToEvent, receiveMessageFromEvent} = useContext(SocketContext);
  const {captain} = useContext(CaptainContext);
  const [ride, setRide] = useState(null);
  const {serverURL} = useContext(UserContext);




  useEffect(()=>{
      if (!captain?._id) return;

      sendMessageToEvent('join',{userId:captain._id, userType:'captain'});

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
      // const locationInterval = setInterval(sendCaptainLocation, 10000);

      // return () => clearInterval(locationInterval);
    },[captain, sendMessageToEvent]);

  useEffect(() => {
    const unsubscribe = receiveMessageFromEvent('new-ride', (data) => {
      setRide(data);
      setIsRidePopUpOpen(true);
    });

    return unsubscribe;
  }, [receiveMessageFromEvent]);


    async function confirmRide() {
      try {
        const response = await axios.post(`${serverURL}/api/ride/confirm`, {
          rideId: ride._id,
        }, {
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error('Failed to confirm ride');
        }

        console.log('Ride confirmed:', response.data);
        setRide(response.data);
        setIsRidePopUpOpen(false);
        setIsConfirmRidePopUpOpen(true);
      } catch (error) {
        console.error('Error confirming ride:', error);
      }
    }

    async function startRide(otp) {
      if (!ride?._id) {
        throw new Error('Ride not found');
      }

      const response = await axios.post(`${serverURL}/api/ride/start-ride`, {
        rideId: ride._id,
        otp,
      }, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error('Failed to start ride');
      }

      return response.data;
    }


  useGSAP(()=>{
    gsap.to(isRidePopUpRef.current,{
      transform: isRidePopUpOpen ? 'translateY(0)' : 'translateY(100%)'
    })
  },[isRidePopUpOpen])

  useGSAP(()=>{
    gsap.to(isConfirmRidePopUpRef.current,{
      transform: isConfirmRidePopUpOpen ? 'translateY(0)' : 'translateY(100%)'
    })
  },[isConfirmRidePopUpOpen])

  return (
    <div className='h-screen'>
    <div className='fixed top-2 right-2 flex justify-between items-center w-full p-5'>
      <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-25'/>
      <Link to={'/captain/logout'} className='bg-gray-100 h-fit p-3 rounded-full text-red-500 text-2xl '>
        <LuLogOut/>
      </Link>
    </div>

      <div className='h-2/3'>
        <img src='https://imgs.search.brave.com/PGPRil5Jz9rjEuBW1RmTIsQvLLXiS61EU_JCixHhyzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdHJhbnNwb3J0/LXNlcnZpY2UtYXBw/LXRlY2hub2xvZ3kt/aWNvbl8yNDkwOC0y/ODQyNC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA' className='w-full h-full'/>
      </div>
      <div className="p-5">
        <CaptainDetails/>
      </div>
      <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl p-5' ref={isRidePopUpRef}>
        <RidePopUp 
        ride={ride}
        setIsRidePopUpOpen={setIsRidePopUpOpen}
        setIsConfirmRidePopUpOpen={setIsConfirmRidePopUpOpen}
        confirmRide={confirmRide}
         />
      </div>
      <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full h-screen rounded-2xl p-5' ref={isConfirmRidePopUpRef}>
        <ConfirmRidePanelPopUp ride={ride} startRide={startRide} setIsConfirmRidePopUpOpen={setIsConfirmRidePopUpOpen} />
      </div>


    </div>
  )
}

export default CaptainHome