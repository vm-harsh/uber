import React, { useContext, useEffect } from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { SiSpeedtest } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { CaptainContext } from '../context/CaptainProvider';

const CaptainDetails = () => {
  const { captain, setCaptain } = useContext(CaptainContext);

  useEffect(() => {
    const saved = localStorage.getItem("captain");
    if (saved && !captain) {
      try {
        setCaptain(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [captain, setCaptain]);

  const captainName = captain?.fullname?.firstname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}`.trim()
    : 'Captain Harsh';

  return (
    <div className='bg-white rounded-3xl p-5 shadow-lg border border-gray-100'>
      {/* Header Profile Row */}
      <div className="w-full flex justify-between items-center pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className='relative'>
            <img
              src='https://imgs.search.brave.com/juwWCYSw9hJDTBiNgIzgI410b9M4WT5Gw6QrqaCFS2M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci84NTcv/ODMyL0hELXdhbGxw/YXBlci1wYXVsLXdh/bGtlci1tYW4tYWN0/b3ItZmFjZS10aHVt/Ym5haWwuanBn'
              alt='Captain avatar'
              className='w-14 h-14 rounded-full object-cover border-2 border-black shadow-xs'
            />
            <span className='absolute -bottom-1 -right-1 bg-black text-yellow-400 text-[10px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5'>
              <FaStar className='text-[8px]' /> 4.95
            </span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 leading-tight">{captainName}</h4>
            <span className='text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md inline-block mt-0.5'>
              ● Online & Ready
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-gray-900 leading-tight">₹295.20</span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Today's Earned</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 mt-4">
        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
          <IoTimeOutline className="text-2xl text-blue-600 mb-1" />
          <h4 className="text-lg font-bold text-gray-900 leading-tight">10.2</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Hours Online</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
          <SiSpeedtest className="text-2xl text-orange-500 mb-1" />
          <h4 className="text-lg font-bold text-gray-900 leading-tight">30 KM</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Distance</p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
          <CgNotes className="text-2xl text-green-600 mb-1" />
          <h4 className="text-lg font-bold text-gray-900 leading-tight">20</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Completed</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails