import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { HiOutlineCash } from 'react-icons/hi'
import { FaCircle, FaSquare } from 'react-icons/fa'
import uber_car from '../assets/uber_car.png';

const LookingForDriver = ({
  setIsVehicleFoundPanel,
  pickUp,
  destination,
  fair
}) => {
  return (
    <div className='flex flex-col w-full max-h-[85vh] overflow-y-auto'>
      {/* Drag handle / Close pill */}
      <div 
        className='w-full flex flex-col items-center pb-2 cursor-pointer select-none group'
        onClick={() => setIsVehicleFoundPanel(false)}
      >
        <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-1 group-hover:bg-gray-400 transition-colors'></div>
        <div className='flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors'>
          <BsChevronDown className='text-sm' />
          <span>Minimize</span>
        </div>
      </div>

      <div className='text-center px-2 mb-2'>
        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Looking for a Driver</h2>
        <p className='text-xs text-gray-500 mt-0.5'>Connecting with drivers in your area...</p>
      </div>

      {/* Animated radar vehicle container */}
      <div className='relative w-full flex items-center justify-center py-6 my-1'>
        {/* Pulse circles */}
        <div className='absolute w-28 h-28 rounded-full bg-blue-100 animate-radar pointer-events-none'></div>
        <div className='absolute w-40 h-40 rounded-full bg-blue-50/60 animate-radar pointer-events-none' style={{ animationDelay: '0.6s' }}></div>

        {/* Vehicle image */}
        <div className='relative z-10 p-3 bg-white rounded-full shadow-md border border-gray-100 animate-float'>
          <img src={uber_car} alt='Looking for driver' className='h-16 w-28 object-contain' />
        </div>
      </div>

      {/* Animated Searching Bar */}
      <div className='w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-4 relative'>
        <div className='h-full bg-black rounded-full shimmer-bg w-full'></div>
      </div>

      {/* Route Info Card */}
      <div className='bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 mb-4 flex flex-col gap-3'>
        {/* Pickup */}
        <div className='flex items-start gap-3 relative'>
          <div className='flex flex-col items-center mt-1'>
            <FaCircle className='text-[10px] text-green-600' />
            <div className='w-0.5 h-6 bg-gray-300 my-0.5'></div>
          </div>
          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Pickup Point</span>
            <p className='text-sm font-semibold text-gray-900 truncate'>{pickUp || 'Current Location'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-start gap-3'>
          <div className='flex flex-col items-center mt-1'>
            <FaSquare className='text-[10px] text-black' />
          </div>
          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Destination</span>
            <p className='text-sm font-semibold text-gray-900 truncate'>{destination || 'Destination Location'}</p>
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
              <span className='text-[10px] text-gray-500'>Estimated Fare</span>
            </div>
          </div>
          <span className='text-base font-bold text-gray-900'>₹{typeof fair === 'number' ? fair.toFixed(2) : (fair || '193.20')}</span>
        </div>
      </div>

      {/* Cancel Request Button */}
      <button
        type='button'
        onClick={() => setIsVehicleFoundPanel(false)}
        className='w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 active:bg-red-200 text-base font-bold rounded-2xl cursor-pointer transition-all border border-red-200'
      >
        Cancel Search
      </button>
    </div>
  )
}

export default LookingForDriver