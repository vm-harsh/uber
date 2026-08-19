import React, { useRef, useState } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { IoTimeOutline } from 'react-icons/io5'
import { LuLogOut } from 'react-icons/lu'
import { SiSpeedtest } from 'react-icons/si'
import { Link } from 'react-router-dom'
import FinishRide from './FinishRide'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketProvider';
import { CaptainContext } from '../context/CaptainProvider';

const CaptainRiding = () => {

  const[finishRidePanel,setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const { sendMessageToEvent } = useContext(SocketContext);
  const { captain } = useContext(CaptainContext);
  const location = useLocation();
  const activeRide = location.state?.ride;

  useGSAP(()=>{
    gsap.to(finishRidePanelRef.current,{
      transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)'
    })
  },[finishRidePanel])

  React.useEffect(() => {
    if (!captain?._id || !activeRide?._id) {
      return undefined;
    }

    const publishLocation = () => {
      navigator.geolocation?.getCurrentPosition(({ coords }) => {
        sendMessageToEvent('update-location-captain', {
          userId: captain._id,
          rideId: activeRide._id,
          location: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    };

    publishLocation();
    const intervalId = setInterval(publishLocation, 5000);

    return () => clearInterval(intervalId);
  }, [captain, activeRide, sendMessageToEvent]);

  return (
    <div className='h-screen'>
    <div className='fixed top-2 right-2 flex justify-between items-center w-full p-5'>
      <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-25'/>
      <Link to={'/captain/logout'} className='bg-gray-100 h-fit p-3 rounded-full text-red-500 text-2xl '>
        <LuLogOut/>
      </Link>
    </div>



      <div className='h-5/6'>
        <img src='https://imgs.search.brave.com/PGPRil5Jz9rjEuBW1RmTIsQvLLXiS61EU_JCixHhyzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdHJhbnNwb3J0/LXNlcnZpY2UtYXBw/LXRlY2hub2xvZ3kt/aWNvbl8yNDkwOC0y/ODQyNC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA' className='w-full h-full'/>
      </div>
      <div className='h-1/6 border-t-2 flex justify-center items-center relative' onClick={()=>{setFinishRidePanel(true)}}>
      <BsChevronCompactDown  className='absolute left-[50%] -translate-x-[50%] top-3 text-4xl  rotate-180 ' />
        <div className='flex justify-between w-full p-5 items-center mt-10'>
          <h4 className='text-3xl font-sans font-bold'>4KM</h4>
          <Link to={'/captain-home'} className=' flex items-center justify-center w-[45] p-4 bg-[#54ac58] text-white text-2xl rounded-xl cursor-pointer '>
            Finish Ride
          </Link>
        </div>
      </div>

      <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full h-screen rounded-2xl p-5' ref={finishRidePanelRef}>
        <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>

    </div>
  )
}

export default CaptainRiding