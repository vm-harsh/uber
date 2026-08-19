import React, { useState } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import uber_car from '../assets/uber_car.png';
import { IoLocation } from 'react-icons/io5';
import { HiOutlineCash } from "react-icons/hi";


const ConfirmRide = ({setIsConfirmRidePanelOpen,setIsVehicleFoundPanel,createRide,pickUp,destination,fair}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

    setIsVehicleFoundPanel(true);
    setIsConfirmRidePanelOpen(false);
    setIsSubmitting(false);
  };

  return (
    <div>
      <BsChevronCompactDown  className='absolute left-[50%] -translate-x-[50%] top-3 text-4xl text-gray-400' onClick={()=>setIsConfirmRidePanelOpen(false)}/>
        <div className='w-full flex flex-col items-center'>
          <img src={uber_car} className='w-70'/>
          <div className='border-t-2 border-gray-400 w-full pl-5'>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <IoLocation className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2 border-b-2 border-gray-300 py-4 w-full'>
                <h2 className='text-2xl font-bold'>PickUp</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>{pickUp}</p>
              </div>
            </div>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <IoLocation className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2 border-b-2 border-gray-300 py-4 w-full'>
                <h2 className='text-2xl font-bold'>Destination</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>{destination}</p>
              </div>
            </div>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <HiOutlineCash className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2  py-4 w-full'>
                <h2 className='text-2xl font-bold'>₹{fair}</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>Cash</p>
              </div>
            </div>
          </div>
          {submitError && <p className='text-red-500 text-lg mb-3'>{submitError}</p>}
          <button className=' flex items-center justify-center w-[90%] py-6 bg-[#54ac58] text-white text-2xl rounded-xl cursor-pointer disabled:opacity-60' disabled={isSubmitting} onClick={handleConfirmRide}>{isSubmitting ? 'Confirming...' : 'Confirm Ride'}</button>
        </div>
    </div>
  )
}

export default ConfirmRide