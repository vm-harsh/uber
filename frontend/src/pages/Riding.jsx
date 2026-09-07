import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineCash, HiShieldCheck } from 'react-icons/hi';
import { FaCircle, FaSquare, FaStar, FaCheckCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import uber_car from '../assets/uber_car.png';
import LiveRideMap from '../components/LiveRideMap';
import { SocketContext } from '../context/SocketProvider';

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { receiveMessageFromEvent } = useContext(SocketContext);

  const [ride, setRide] = useState(location.state?.ride || null);
  const [captainLocation, setCaptainLocation] = useState(
    location.state?.ride?.captain?.location || null
  );
  const [isRideEnded, setIsRideEnded] = useState(false);
  const [finishedRideData, setFinishedRideData] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    // Listen for captain real-time GPS updates
    const unsubscribeLocation = receiveMessageFromEvent('captain-location-updated', (payload) => {
      if (!payload?.location) return;
      if (ride?._id && payload.rideId && payload.rideId !== ride._id) return;
      setCaptainLocation(payload.location);
    });

    // Listen for captain ending/completing the ride
    const unsubscribeEndRide = receiveMessageFromEvent('ride-ended', (completedRide) => {
      setFinishedRideData(completedRide);
      setIsRideEnded(true);
    });

    return () => {
      if (unsubscribeLocation) unsubscribeLocation();
      if (unsubscribeEndRide) unsubscribeEndRide();
    };
  }, [receiveMessageFromEvent, ride]);

  const driverName = ride?.captain?.fullname?.firstname
    ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname || ''}`.trim()
    : 'Captain Harsh';

  const vehicleDesc = `${ride?.captain?.vehicle?.color || 'White'} • ${ride?.captain?.vehicle?.vehicleType || 'UberGo'}`;
  const plateNumber = ride?.captain?.vehicle?.plate || 'DL 01 BK 2024';
  const fare = finishedRideData?.fare || ride?.fare || '193.20';
  const pickup = ride?.pickup || 'Pickup Point';
  const destination = ride?.destination || 'Destination Point';

  const handleFinishAndHome = () => {
    navigate('/home');
  };

  return (
    <div className='w-full h-screen relative overflow-hidden bg-gray-100 flex flex-col justify-between'>
      {/* Fullscreen Interactive Leaflet Live Map */}
      <div className='absolute inset-0 z-0'>
        <LiveRideMap captainLocation={captainLocation} />
      </div>

      {/* Floating Top Header */}
      <header className='fixed top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-auto'>
        <div className='bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-gray-100 flex items-center gap-2.5'>
          <img
            src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw'
            alt='Uber'
            className='h-5 w-auto object-contain'
          />
          <div className='flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-xs font-bold'>
            <span className='w-2 h-2 rounded-full bg-green-600 animate-pulse'></span>
            <span>En Route</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => alert('Trip status link copied! You can share it with family and friends.')}
            title='Share Status'
            className='w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors cursor-pointer'
          >
            <RiShareForwardFill className='text-lg' />
          </button>

          <Link
            to='/home'
            title='Back to Home'
            className='w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black transition-colors'
          >
            <AiFillHome className='text-lg' />
          </Link>
        </div>
      </header>

      {/* Bottom Ride Status Sheet */}
      <div className='fixed bottom-0 left-0 right-0 w-full z-10 max-w-2xl mx-auto'>
        <div className='bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 p-5'>
          {/* Driver & Vehicle Row */}
          <div className='flex items-center justify-between pb-3.5 border-b border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <img
                  src='https://imgs.search.brave.com/juwWCYSw9hJDTBiNgIzgI410b9M4WT5Gw6QrqaCFS2M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci84NTcv/ODMyL0hELXdhbGxw/YXBlci1wYXVsLXdh/bGtlci1tYW4tYWN0/b3ItZmFjZS10aHVt/Ym5haWwuanBn'
                  alt='Driver'
                  className='w-12 h-12 rounded-full object-cover border-2 border-yellow-400'
                />
                <span className='absolute -bottom-1 -right-1 bg-yellow-400 text-black text-[9px] font-bold px-1 rounded-full flex items-center gap-0.5 shadow-xs'>
                  <FaStar className='text-[7px]' /> 4.9
                </span>
              </div>
              <div>
                <h3 className='font-bold text-base text-gray-900 leading-tight'>{driverName}</h3>
                <p className='text-xs text-gray-500 capitalize'>{vehicleDesc}</p>
              </div>
            </div>

            <div className='text-right'>
              <div className='bg-gray-100 px-2.5 py-1 rounded-lg font-mono text-xs font-bold text-gray-900'>
                {plateNumber}
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className='bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 my-3 flex flex-col gap-2.5'>
            {/* Pickup */}
            <div className='flex items-start gap-3 relative'>
              <div className='flex flex-col items-center mt-1'>
                <FaCircle className='text-[9px] text-green-600' />
                <div className='w-0.5 h-6 bg-gray-300 my-0.5'></div>
              </div>
              <div className='flex flex-col min-w-0 flex-1'>
                <span className='text-[9px] uppercase font-bold text-gray-400 tracking-wider'>Pickup</span>
                <p className='text-xs font-semibold text-gray-900 truncate'>{pickup}</p>
              </div>
            </div>

            {/* Destination */}
            <div className='flex items-start gap-3'>
              <div className='flex flex-col items-center mt-1'>
                <FaSquare className='text-[9px] text-black' />
              </div>
              <div className='flex flex-col min-w-0 flex-1'>
                <span className='text-[9px] uppercase font-bold text-gray-400 tracking-wider'>Destination</span>
                <p className='text-xs font-semibold text-gray-900 truncate'>{destination}</p>
              </div>
            </div>

            {/* Payment */}
            <div className='flex items-center justify-between pt-2 border-t border-gray-200'>
              <div className='flex items-center gap-2 text-gray-700'>
                <div className='w-6 h-6 rounded-lg bg-green-100 text-green-700 flex items-center justify-center'>
                  <HiOutlineCash className='text-sm' />
                </div>
                <div>
                  <span className='text-xs font-bold text-gray-900 block'>Cash Payment</span>
                  <span className='text-[9px] text-gray-500'>Pay when trip concludes</span>
                </div>
              </div>
              <span className='text-base font-bold text-gray-900'>₹{fare}</span>
            </div>
          </div>

          {/* Safety & Status Indicator */}
          <div className='flex items-center justify-between bg-blue-50/80 border border-blue-100 rounded-xl p-2.5 mb-2'>
            <div className='flex items-center gap-2 text-blue-700'>
              <HiShieldCheck className='text-lg shrink-0' />
              <span className='text-xs font-semibold'>Uber Safety Shield Active</span>
            </div>
            <span className='text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md'>
              GPS Live
            </span>
          </div>
        </div>
      </div>

      {/* RIDE COMPLETED / RECEIPT POPUP MODAL */}
      {isRideEnded && (
        <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in'>
          <div className='bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 w-full max-w-md border border-gray-100 animate-slide-up'>
            {/* Checkmark header */}
            <div className='flex flex-col items-center text-center mb-4'>
              <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 shadow-xs'>
                <FaCheckCircle className='text-3xl' />
              </div>
              <h2 className='text-2xl font-black text-gray-900 tracking-tight'>You Have Arrived!</h2>
              <p className='text-xs text-gray-500 mt-0.5'>Your trip has concluded successfully</p>
            </div>

            {/* Total Fare Card */}
            <div className='bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4 text-center'>
              <span className='text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1'>
                Total Fare to Pay
              </span>
              <h3 className='text-3xl font-black text-gray-900'>₹{fare}</h3>
              <div className='mt-2 inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold'>
                <HiOutlineCash className='text-sm' />
                <span>Pay directly with Cash</span>
              </div>
            </div>

            {/* Rate Driver */}
            <div className='flex flex-col items-center mb-5'>
              <span className='text-xs font-semibold text-gray-600 mb-1.5'>Rate your ride with {driverName}</span>
              <div className='flex items-center gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onClick={() => setRating(star)}
                    className='text-2xl cursor-pointer transition-transform hover:scale-110'
                  >
                    <FaStar className={star <= rating ? 'text-yellow-400' : 'text-gray-200'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Complete & Return Button */}
            <button
              type='button'
              onClick={handleFinishAndHome}
              className='w-full py-4 bg-black hover:bg-gray-900 active:scale-[0.99] text-white text-base font-bold rounded-2xl cursor-pointer transition-all shadow-lg shadow-black/10 text-center'
            >
              Done & Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Riding;