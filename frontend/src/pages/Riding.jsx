import React from 'react'
import { HiOutlineCash } from 'react-icons/hi'
import { IoLocation } from 'react-icons/io5'
import uber_car from '../assets/uber_car.png';
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';


const Riding = () => {
  return (
    <div className='h-screen'>
      <Link to={'/home'} className='fixed top-2 right-2 bg-gray-400  text-white text-2xl rounded-full p-3'>
        <AiFillHome/>
      </Link>

      <div className='h-1/2'>
        <img src='https://imgs.search.brave.com/PGPRil5Jz9rjEuBW1RmTIsQvLLXiS61EU_JCixHhyzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdHJhbnNwb3J0/LXNlcnZpY2UtYXBw/LXRlY2hub2xvZ3kt/aWNvbl8yNDkwOC0y/ODQyNC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA' className='w-full h-full'/>
      </div>
      <div className='h-1/2 p-5 flex flex-col justify-between items-center'>
        <div>
        
              <div className='flex items-center justify-between px-5'>
                <img src={uber_car} className='w-22'/>
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Harsh</h2>
                    <h4 className='text-xl font-semibold -my-1'>UP 15 BK 2025</h4>
                    <p className='text-sm text-gray-600'>Audi R8</p>
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
                        <p className='text-xl text-gray-500 font-medium pr-5'>Kaikondrahilli, Bengaluru, Karnataka</p>
                      </div>
                    </div>
                    <div className='flex gap-5 items-center mb-4'>
                      <div className='rounded-full bg-gray-200 w-14 h-12 flex items-center justify-center'>
                        <HiOutlineCash className='text-2xl '/>
                      </div>
                      <div className='flex flex-col gap-2  py-4 w-full'>
                        <h2 className='text-2xl font-bold'>₹193.20</h2>
                        <p className='text-xl text-gray-500 font-medium pr-5'>Cash</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <button className=' flex items-center justify-center w-[90%] py-6 bg-[#54ac58] text-white text-2xl rounded-xl cursor-pointer' >Make a Payment</button>
      </div>
    </div>
  )
}

export default Riding