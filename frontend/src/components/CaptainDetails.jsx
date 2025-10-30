import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { SiSpeedtest } from "react-icons/si";
import { CgNotes } from "react-icons/cg";
const CaptainDetails = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
            <div className="w-2/3 flex items-center gap-3">
              <img src='https://imgs.search.brave.com/juwWCYSw9hJDTBiNgIzgI410b9M4WT5Gw6QrqaCFS2M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci84NTcv/ODMyL0hELXdhbGxw/YXBlci1wYXVsLXdh/bGtlci1tYW4tYWN0/b3ItZmFjZS10aHVt/Ym5haWwuanBn' className='w-15 h-15 rounded-full'/>
              <h4 className="text-2xl font-semibold">Captain_Name</h4>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <h4 className="text-2xl font-semibold">₹295.20</h4>
              <p className="text-gray-600 text-lg">Earned</p>
            </div>
          </div>
      <div className="flex justify-evenly bg-gray-300 w-full mt-10 p-5 rounded-xl">
        <div className="flex flex-col gap-2 items-center">
          <IoTimeOutline className="text-3xl"/>
          <h4 className="text-2xl font-bold">10.2</h4>
          <p className="text-sm text-gray-600 font-medium">HOURS ONLINE</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <SiSpeedtest className="text-3xl"/>
          <h4 className="text-2xl font-bold">30 KM</h4>
          <p className="text-sm text-gray-600 font-medium">TOTAL DISTANCE</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <CgNotes className="text-3xl"/>
          <h4 className="text-2xl font-bold">20</h4>
          <p className="text-sm text-gray-600 font-medium">TOTAL JOINS</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails