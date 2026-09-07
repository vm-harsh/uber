import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import uber_car from '../assets/uber_car.png';
import { IoLocationSharp } from 'react-icons/io5';
import { HiOutlineCash } from "react-icons/hi";
import { FaCircle, FaSquare } from "react-icons/fa";

const ConfirmRide = ({
  setIsConfirmRidePanelOpen,
  setIsVehiclePanelOpen,
  setIsVehicleFoundPanel,
  createRide,
  pickUp,
  destination,
  fair
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleBack = () => {
    setIsConfirmRidePanelOpen(false);
    if (setIsVehiclePanelOpen) {
      setIsVehiclePanelOpen(true);
    }
  };

  const handleConfirmRide = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const isCreated = await createRide();

    if (!isCreated) {
      setSubmitError('Unable to create ride. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsConfirmRidePanelOpen(false);
    setIsVehicleFoundPanel(true);
    setIsSubmitting(false);
  };

  return (
    <div className='flex flex-col w-full max-h-[85vh] overflow-y-auto'>
      {/* Drag handle / Close pill */}
      <div 
        className='w-full flex flex-col items-center pb-2 cursor-pointer select-none group'
        onClick={handleBack}
      >
        <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-1 group-hover:bg-gray-400 transition-colors'></div>
        <div className='flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors'>
          <BsChevronDown className='text-sm' />
          <span>Back to vehicles</span>
        </div>
      </div>

      <div className='flex items-center justify-between px-1 mb-2'>
        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Confirm Your Ride</h2>
        <span className='text-lg font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl'>
          ₹{typeof fair === 'number' ? fair.toFixed(2) : (fair || '193.20')}
        </span>
      </div>

      {/* Vehicle image badge */}
      <div className='w-full flex items-center justify-center py-2 bg-gray-50 rounded-2xl mb-3 border border-gray-100'>
        <img src={uber_car} alt='Uber ride' className='h-24 object-contain animate-float' />
      </div>

      {/* Route Timeline Card */}
      <div className='bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 mb-4 flex flex-col gap-3'>
        {/* Pickup */}
        <div className='flex items-start gap-3 relative'>
          <div className='flex flex-col items-center mt-1'>
            <FaCircle className='text-[10px] text-green-600' />
            <div className='w-0.5 h-7 bg-gray-300 my-0.5'></div>
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
            <p className='text-sm font-semibold text-gray-900 truncate'>{destination || 'Selected Destination'}</p>
          </div>
        </div>

        {/* Payment */}
        <div className='flex items-center justify-between pt-2 border-t border-gray-200 mt-1'>
          <div className='flex items-center gap-2 text-gray-700'>
            <div className='w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center'>
              <HiOutlineCash className='text-base' />
            </div>
            <div>
              <span className='text-xs font-bold text-gray-900 block'>Cash Payment</span>
              <span className='text-[10px] text-gray-500'>Pay directly to driver</span>
            </div>
          </div>
          <span className='text-sm font-bold text-gray-900'>₹{typeof fair === 'number' ? fair.toFixed(2) : (fair || '193.20')}</span>
        </div>
      </div>

      {submitError && (
        <div className='p-2.5 mb-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center'>
          {submitError}
        </div>
      )}

      {/* CTA button */}
      <button
        type='button'
        disabled={isSubmitting}
        onClick={handleConfirmRide}
        className='w-full py-4 bg-black hover:bg-gray-900 active:scale-[0.99] text-white text-lg font-bold rounded-2xl cursor-pointer disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10'
      >
        {isSubmitting ? (
          <>
            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            <span>Requesting Ride...</span>
          </>
        ) : (
          <span>Confirm Ride</span>
        )}
      </button>
    </div>
  )
}

export default ConfirmRide