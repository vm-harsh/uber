import React, { useRef, useState, useEffect, useContext } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { LuLogOut } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from './FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketProvider';
import { CaptainContext } from '../context/CaptainProvider';
import LiveRideMap from './LiveRideMap';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const { sendMessageToEvent } = useContext(SocketContext);
  const { captain } = useContext(CaptainContext);
  const location = useLocation();
  const activeRide = location.state?.ride;

  const [captainCoords, setCaptainCoords] = useState(
    captain?.location || { lat: 28.6139, lng: 77.2090 }
  );

  useGSAP(() => {
    gsap.set(finishRidePanelRef.current, {
      yPercent: 105
    });
  }, []);

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      yPercent: finishRidePanel ? 0 : 105,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [finishRidePanel]);

  useEffect(() => {
    if (!captain?._id) {
      return undefined;
    }

    const publishLocation = () => {
      navigator.geolocation?.getCurrentPosition(({ coords }) => {
        const newLoc = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        setCaptainCoords(newLoc);
        sendMessageToEvent('update-location-captain', {
          userId: captain._id,
          rideId: activeRide?._id,
          location: newLoc,
        });
      });
    };

    publishLocation();
    const intervalId = setInterval(publishLocation, 5000);

    return () => clearInterval(intervalId);
  }, [captain, activeRide, sendMessageToEvent]);

  return (
    <div className='w-full h-screen relative overflow-hidden bg-gray-100 flex flex-col justify-between'>
      {/* Background Fullscreen Live Map */}
      <div className='absolute inset-0 z-0'>
        <LiveRideMap captainLocation={captainCoords} />
      </div>

      {/* Floating Top Header */}
      <header className='fixed top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-auto'>
        <div className='bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-gray-100 flex items-center gap-2'>
          <img
            src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw'
            alt='Uber Captain'
            className='h-5 w-auto object-contain'
          />
          <span className='text-xs font-black bg-green-600 text-white px-2 py-0.5 rounded-md uppercase'>
            On Trip
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

      {/* Quick Status Bottom Bar */}
      <div
        className='fixed bottom-0 left-0 right-0 w-full z-10 max-w-2xl mx-auto'
      >
        <div
          className='bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 p-5 cursor-pointer flex flex-col items-center'
          onClick={() => setFinishRidePanel(true)}
        >
          <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-3'></div>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700'>
                <BsChevronUp className='text-xl' />
              </div>
              <div>
                <span className='text-xs font-bold text-gray-400 uppercase tracking-wider block'>Passenger</span>
                <h4 className='text-lg font-bold text-gray-900 leading-tight truncate max-w-[150px]'>
                  {activeRide?.user?.fullname?.firstname || 'Passenger'}
                </h4>
              </div>
            </div>

            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setFinishRidePanel(true);
              }}
              className='px-6 py-3.5 bg-[#54ac58] hover:bg-[#46934a] active:scale-[0.99] text-white text-base font-bold rounded-2xl cursor-pointer shadow-md shadow-green-600/20 transition-all'
            >
              Finish Ride
            </button>
          </div>
        </div>
      </div>

      {/* FINISH RIDE MODAL */}
      <div
        ref={finishRidePanelRef}
        className={`fixed bottom-0 left-0 right-0 w-full z-30 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 px-5 pt-3 pb-6 max-w-2xl mx-auto ${
          finishRidePanel ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <FinishRide ride={activeRide} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding