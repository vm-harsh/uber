import React from 'react'
import { BsChevronDown, BsShieldCheck } from 'react-icons/bs'
import { HiOutlineCash, HiPhone } from 'react-icons/hi'
import { FaCircle, FaSquare, FaStar } from 'react-icons/fa'
import uber_car from '../assets/uber_car.png';

const WaitingForDriver = ({ ride, setIsWaitingForDriverPanel }) => {
  const driverName = ride?.captain?.fullname?.firstname
    ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname || ''}`.trim()
    : 'Captain Harsh';

  const vehiclePlate = ride?.captain?.vehicle?.plate || 'DL 01 BK 2024';
  const vehicleDesc = `${ride?.captain?.vehicle?.color || 'White'} ${ride?.captain?.vehicle?.vehicleType || 'UberGo'}`;
  const otp = ride?.otp || '4829';
  const fare = ride?.fare || '193.20';

  return (
    <div className='flex flex-col w-full max-h-[85vh] overflow-y-auto'>
      {/* Drag handle / Close pill */}
      <div 
        className='w-full flex flex-col items-center pb-2 cursor-pointer select-none group'
        onClick={() => setIsWaitingForDriverPanel(false)}
      >
        <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-1 group-hover:bg-gray-400 transition-colors'></div>
        <div className='flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors'>
          <BsChevronDown className='text-sm' />
          <span>Minimize</span>
        </div>
      </div>

      {/* Driver & OTP Card */}
      <div className='bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-4 mb-3 shadow-lg'>
        <div className='flex items-center justify-between'>
          {/* Driver Avatar & Info */}
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <img
                src='https://imgs.search.brave.com/juwWCYSw9hJDTBiNgIzgI410b9M4WT5Gw6QrqaCFS2M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci84NTcv/ODMyL0hELXdhbGxw/YXBlci1wYXVsLXdh/bGtlci1tYW4tYWN0/b3ItZmFjZS10aHVt/Ym5haWwuanBn'
                alt='Driver profile'
                className='w-14 h-14 rounded-full object-cover border-2 border-yellow-400'
              />
              <span className='absolute -bottom-1 -right-1 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5 shadow-xs'>
                <FaStar className='text-[8px]' /> 4.9
              </span>
            </div>
            <div>
              <h3 className='font-bold text-lg text-white leading-tight'>{driverName}</h3>
              <p className='text-xs text-gray-300 capitalize'>{vehicleDesc}</p>
              <div className='mt-1 inline-block bg-gray-700/80 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-yellow-300 tracking-wider'>
                {vehiclePlate}
              </div>
            </div>
          </div>

          {/* OTP Card */}
          <div className='flex flex-col items-center bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 text-center'>
            <span className='text-[10px] font-semibold text-gray-300 uppercase tracking-wider'>Your PIN</span>
            <span className='text-2xl font-black text-yellow-400 tracking-widest font-mono my-0.5'>{otp}</span>
            <span className='text-[9px] text-gray-400'>Share with driver</span>
          </div>
        </div>
      </div>

      {/* Route Info Card */}
      <div className='bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 mb-3 flex flex-col gap-3'>
        {/* Pickup */}
        <div className='flex items-start gap-3 relative'>
          <div className='flex flex-col items-center mt-1'>
            <FaCircle className='text-[10px] text-green-600' />
            <div className='w-0.5 h-6 bg-gray-300 my-0.5'></div>
          </div>
          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Pickup Point</span>
            <p className='text-sm font-semibold text-gray-900 truncate'>{ride?.pickup || 'Pickup Location'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-start gap-3'>
          <div className='flex flex-col items-center mt-1'>
            <FaSquare className='text-[10px] text-black' />
          </div>
          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Destination</span>
            <p className='text-sm font-semibold text-gray-900 truncate'>{ride?.destination || 'Destination Location'}</p>
          </div>
        </div>

        {/* Payment */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-200 mt-1'>
          <div className='flex items-center gap-2 text-gray-700'>
            <div className='w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center'>
              <HiOutlineCash className='text-base' />
            </div>
            <div>
              <span className='text-xs font-bold text-gray-900 block'>Cash</span>
              <span className='text-[10px] text-gray-500'>Pay when ride ends</span>
            </div>
          </div>
          <span className='text-base font-bold text-gray-900'>₹{fare}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='grid grid-cols-2 gap-2.5'>
        <button
          type='button'
          onClick={() => alert('Connecting call with driver...')}
          className='flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 text-sm font-bold rounded-xl transition-colors cursor-pointer'
        >
          <HiPhone className='text-lg text-green-600' />
          <span>Call Driver</span>
        </button>

        <button
          type='button'
          onClick={() => setIsWaitingForDriverPanel(false)}
          className='flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 active:bg-red-200 text-sm font-bold rounded-xl transition-colors cursor-pointer border border-red-200'
        >
          <span>Cancel Ride</span>
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver