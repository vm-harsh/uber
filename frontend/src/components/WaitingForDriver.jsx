import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { HiOutlineCash } from 'react-icons/hi'
import { IoLocation } from 'react-icons/io5'
import uber_car from '../assets/uber_car.png';

const WaitingForDriver = ({ride, setIsWaitingForDriverPanel}) => {
  return (
    <div>
      <BsChevronCompactDown  className='absolute left-[50%] -translate-x-[50%] top-3 text-4xl text-gray-400' onClick={()=>setIsWaitingForDriverPanel(false)}/>

      <div className='flex items-center justify-between px-5'>
        <img src={uber_car} className='w-22'/>
        <div className='text-right'>
            <h2 className='text-lg font-medium'>{ride?.captain?.fullname?.firstname || 'Captain'} {ride?.captain?.fullname?.lastname || ''}</h2>
            <h4 className='text-xl font-semibold -my-1'>{ride?.captain?.vehicle?.plate || 'NA'}</h4>
            <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color || ''} {ride?.captain?.vehicle?.vehicleType || ''}</p>
            <h1 className='text-lg font-medium'>OTP: {ride?.otp || '****'}</h1>

        </div>
      </div>

        <div className='w-full flex flex-col items-center'>
          <div className='w-full pl-5'>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <IoLocation className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2 border-b-2 border-gray-300 py-4 w-full'>
                <h2 className='text-2xl font-bold'>562/11-A</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>{ride?.pickup || 'Pickup Location'}</p>
              </div>
            </div>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <IoLocation className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2 border-b-2 border-gray-300 py-4 w-full'>
                <h2 className='text-2xl font-bold'>Third Wave Coffee</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>{ride?.destination || 'Destination'}</p>
              </div>
            </div>
            <div className='flex gap-5 items-center mb-4'>
              <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                <HiOutlineCash className='text-2xl '/>
              </div>
              <div className='flex flex-col gap-2  py-4 w-full'>
                <h2 className='text-2xl font-bold'>₹{ride?.fare || '0.00'}</h2>
                <p className='text-xl text-gray-500 font-medium pr-5'>Cash</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WaitingForDriver