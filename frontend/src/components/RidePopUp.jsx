import React from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { HiOutlineCash } from 'react-icons/hi'
import { IoLocation } from 'react-icons/io5'
import uber_car from '../assets/uber_car.png';

const RidePopUp = ({setIsRidePopUpOpen,setIsConfirmRidePopUpOpen,ride,confirmRide}) => {
  return (
    <div>
          <BsChevronCompactDown  className='absolute left-[50%] -translate-x-[50%] top-3 text-4xl text-gray-400' onClick={()=>setIsRidePopUpOpen(false)}/>
            <h2 className='text-3xl font-[750] my-5'>New Ride Available!</h2>
            <div className='w-full flex flex-col items-center'>
              <div className='flex items-center justify-between w-full rounded-2xl bg-yellow-400 px-5 py-3 mb-5'>
                <div className='flex gap-3 items-center'>
                  <img src="https://imgs.search.brave.com/MQXrMiMQMD8C3HNUcSBuT60Ern1Vhq5nZlgrQm2IJ9g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/MjA5NjI1Ny9waG90/by9wb3J0cmFpdC1v/Zi1zbWFsbC1naXJs/LWluLWxpdmluZy1y/b29tLWF0LWhvbWUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PThwb2s2elFHRzRa/bzd0bVlJYVY1M240/dGVwN3VGcjc0WVpo/OEtneGdvYmM9" alt="girl image" className='w-20 h-20 rounded-full' />
                  <h2 className="text-2xl font-semibold">{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</h2>
                </div>
                <h4 className="text-2xl font-semibold">2.4KM</h4>
              </div>
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
              <div className='w-full flex gap-3'>
                <button className=' flex items-center justify-center w-full py-6 bg-[#54ac58] text-white text-2xl rounded-xl cursor-pointer' onClick={()=>{
                setIsRidePopUpOpen(false)
                setIsConfirmRidePopUpOpen(true)
                  confirmRide()
              }}>Accept</button>
              <button className=' flex items-center justify-center w-full py-6 bg-gray-600 text-white text-2xl rounded-xl cursor-pointer' onClick={()=>{
                setIsRidePopUpOpen(false)
              }}>Ignore</button>
              </div>
            </div>
    </div>
  )
}

export default RidePopUp