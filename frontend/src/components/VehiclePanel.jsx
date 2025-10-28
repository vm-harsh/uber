import React from 'react'
import { BsChevronCompactDown } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import ubercar from '../assets/uber_car.png';

const VehiclePanel = ({setIsVehiclePanelOpen,setIsConfirmRidePanelOpen}) => {
  return (
    <div className='flex flex-col gap-2'>
      <BsChevronCompactDown  className='absolute left-[50%] -translate-x-[50%] top-3 text-4xl text-gray-400' onClick={()=>setIsVehiclePanelOpen(false)}/>
          <h2 className='text-3xl font-bold mb-4'>Choose a Vehicle</h2>
          <div className='flex items-center justify-between  p-5 border-2 border-gray-200 active:border-black rounded-xl transition-all duration-100' onClick={()=>setIsConfirmRidePanelOpen(true)}>
            <img className='h-15' src={ubercar}/>
            <div className='flex flex-col w-1/2 '>
              <h4 className='flex text-xl gap-2 items-center font-semibold'>UberGo <span className='flex gap-0.5 items-center font-normal'><FaUser />4</span></h4>
              <h5 className='text-lg font-medium'>2 mins away</h5>
              <p className='text-sm text-gray-500 '>Affordable, compact rides</p>
            </div>
            <h2 className='text-2xl font-bold'>₹193.20</h2>
          </div>
          <div className='flex items-center justify-between  p-5 border-2 border-gray-200 active:border-black rounded-xl transition-all duration-100' onClick={()=>setIsConfirmRidePanelOpen(true)}>
            <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hMjU1M2ExOC0yZjc3LTQ3MjItYTRiYS1mNzM2ZjRjYjQwNWUucG5n'/>
            <div className='flex flex-col w-1/2  -ml-11'>
              <h4 className='flex text-xl gap-2 items-center font-semibold'>Moto <span className='flex gap-0.5 items-center font-normal'><FaUser />1</span></h4>
              <h5 className='text-lg font-medium'>3 mins away</h5>
              <p className='text-sm text-gray-500 '>Affordable, motorcycle rides</p>
            </div>
            <h2 className='text-2xl font-bold'>₹65</h2>
          </div>
          <div className='flex items-center justify-between  p-5 border-2 border-gray-200 active:border-black rounded-xl transition-all duration-100' onClick={()=>setIsConfirmRidePanelOpen(true)}>
            <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n'/>
            <div className='flex flex-col w-1/2 '>
              <h4 className='flex text-xl gap-2 items-center font-semibold'>UberAuto <span className='flex gap-0.5 items-center font-normal'><FaUser />3</span></h4>
              <h5 className='text-lg font-medium'>3 mins away</h5>
              <p className='text-sm text-gray-500 '>Affordable, Auto rides</p>
            </div>
            <h2 className='text-2xl font-bold'>₹118.86</h2>
          </div>
    </div>
  )
}

export default VehiclePanel