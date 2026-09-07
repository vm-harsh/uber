import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { HiOutlineCash } from 'react-icons/hi'
import { FaCircle, FaSquare, FaKey } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePanelPopUp = ({ ride, startRide, setIsConfirmRidePopUpOpen }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const userName = ride?.user?.fullname?.firstname
    ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname || ''}`.trim()
    : 'Passenger';

  const fare = ride?.fare || '193.20';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError('Please enter the OTP PIN');
      return;
    }

    setOtpError('');
    setIsStarting(true);

    try {
      const startedRide = await startRide(otp);
      navigate('/captain-riding', {
        state: {
          ride: startedRide,
        },
      });
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Invalid OTP';
      setOtpError(message);
      setIsStarting(false);
    }
  }

  return (
    <div className='flex flex-col w-full max-h-[90vh] overflow-y-auto'>
      {/* Drag handle / Close pill */}
      <div 
        className='w-full flex flex-col items-center pb-2 cursor-pointer select-none group'
        onClick={() => setIsConfirmRidePanelOpen(false)}
      >
        <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-1 group-hover:bg-gray-400 transition-colors'></div>
        <div className='flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors'>
          <BsChevronDown className='text-sm' />
          <span>Back</span>
        </div>
      </div>

      <div className='flex items-center justify-between px-1 mb-3'>
        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Enter Passenger OTP</h2>
        <span className='text-xl font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-xl'>
          ₹{fare}
        </span>
      </div>

      {/* Passenger Card */}
      <div className='flex items-center justify-between w-full rounded-2xl bg-yellow-400/90 p-3.5 mb-3 shadow-xs'>
        <div className='flex gap-3 items-center'>
          <img
            src="https://imgs.search.brave.com/MQXrMiMQMD8C3HNUcSBuT60Ern1Vhq5nZlgrQm2IJ9g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM1/MjA5NjI1Ny9waG90/by9wb3J0cmFpdC1v/Zi1zbWFsbC1naXJs/LWluLWxpdmluZy1y/b29tLWF0LWhvbWUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PThwb2s2elFHRzRa/bzd0bVlJYVY1M240/dGVwN3VGcjc0WVpo/OEtneGdvYmM9"
            alt="passenger"
            className='w-12 h-12 rounded-full object-cover border-2 border-white'
          />
          <div>
            <h3 className="text-base font-bold text-gray-900 leading-tight">{userName}</h3>
            <span className='text-xs font-medium text-gray-800'>Ready for pickup</span>
          </div>
        </div>
        <span className="text-sm font-bold bg-black text-white px-2.5 py-1 rounded-lg">2.4 KM</span>
      </div>

      {/* Route Timeline */}
      <div className='bg-gray-50/90 rounded-2xl p-3.5 border border-gray-100 mb-4 flex flex-col gap-3'>
        {/* Pickup */}
        <div className='flex items-start gap-3 relative'>
          <div className='flex flex-col items-center mt-1'>
            <FaCircle className='text-[10px] text-green-600' />
            <div className='w-0.5 h-6 bg-gray-300 my-0.5'></div>
          </div>
          <div className='flex flex-col min-w-0 flex-1'>
            <span className='text-[10px] uppercase font-bold text-gray-400 tracking-wider'>Pickup</span>
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
              <span className='text-[10px] text-gray-500'>Collect at destination</span>
            </div>
          </div>
          <span className='text-base font-bold text-gray-900'>₹{fare}</span>
        </div>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
        <div className='relative flex items-center'>
          <div className='absolute left-4 text-gray-400 text-lg pointer-events-none'>
            <FaKey />
          </div>
          <input
            type="number"
            value={otp}
            placeholder='Enter OTP PIN'
            onChange={(e) => setOtp(e.target.value)}
            className='w-full pl-12 pr-4 py-3.5 bg-gray-100 focus:bg-white text-xl font-mono font-bold tracking-widest text-center rounded-2xl border border-transparent focus:border-black outline-hidden transition-all'
          />
        </div>

        {otpError && (
          <p className='text-red-500 text-xs font-semibold text-center'>{otpError}</p>
        )}

        <div className='grid grid-cols-2 gap-3 mt-1'>
          <button
            type='submit'
            disabled={isStarting}
            className='py-4 bg-[#54ac58] hover:bg-[#46934a] active:scale-[0.99] text-white text-base font-bold rounded-2xl cursor-pointer transition-all shadow-md shadow-green-600/20 disabled:opacity-60 text-center flex items-center justify-center gap-2'
          >
            {isStarting ? 'Starting...' : 'Start Trip'}
          </button>
          <button
            type='button'
            onClick={() => setIsConfirmRidePopUpOpen(false)}
            className='py-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 text-base font-bold rounded-2xl cursor-pointer transition-colors text-center'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfirmRidePanelPopUp