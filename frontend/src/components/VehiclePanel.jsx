import React from 'react'
import { BsChevronDown } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { RiFlashlightFill } from "react-icons/ri";
import ubercar from '../assets/uber_car.png';

const VehiclePanel = ({
  setIsVehiclePanelOpen,
  setIsConfirmRidePanelOpen,
  fairs,
  setVehicleType
}) => {
  const openConfirmRidePanel = (type) => {
    setVehicleType(type);
    setIsVehiclePanelOpen(false);
    setIsConfirmRidePanelOpen(true);
  };

  const vehicles = [
    {
      id: 'car',
      name: 'UberGo',
      capacity: 4,
      eta: '2 mins away',
      desc: 'Affordable, compact rides',
      price: fairs?.car || 193.20,
      image: ubercar,
      popular: true
    },
    {
      id: 'bike',
      name: 'Moto',
      capacity: 1,
      eta: '3 mins away',
      desc: 'Affordable motorcycle rides',
      price: fairs?.bike || 65.00,
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9hMjU1M2ExOC0yZjc3LTQ3MjItYTRiYS1mNzM2ZjRjYjQwNWUucG5n',
      popular: false
    },
    {
      id: 'auto',
      name: 'UberAuto',
      capacity: 3,
      eta: '4 mins away',
      desc: 'Fast, hassle-free auto rides',
      price: fairs?.auto || 118.50,
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=576/height=384/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n',
      popular: false
    }
  ];

  return (
    <div className='flex flex-col w-full max-h-[80vh] overflow-y-auto'>
      {/* Drag handle / Close pill */}
      <div 
        className='w-full flex flex-col items-center pb-3 cursor-pointer select-none group'
        onClick={() => setIsVehiclePanelOpen(false)}
      >
        <div className='w-12 h-1.5 bg-gray-300 rounded-full mb-1 group-hover:bg-gray-400 transition-colors'></div>
        <div className='flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors'>
          <BsChevronDown className='text-sm' />
          <span>Swipe down or click to close</span>
        </div>
      </div>

      <div className='flex items-center justify-between px-1 mb-3'>
        <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Choose a Vehicle</h2>
        <span className='text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full'>
          Recommended
        </span>
      </div>

      <div className='flex flex-col gap-2.5'>
        {vehicles.map((v) => (
          <div
            key={v.id}
            onClick={() => openConfirmRidePanel(v.id)}
            className='relative flex items-center justify-between p-3.5 bg-white hover:bg-gray-50 active:bg-gray-100 border-2 border-gray-200 hover:border-black rounded-2xl transition-all duration-150 cursor-pointer shadow-xs group'
          >
            {v.popular && (
              <span className='absolute -top-2.5 right-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs'>
                <RiFlashlightFill className='text-yellow-400 text-xs' /> POPULAR
              </span>
            )}

            <div className='w-16 h-12 flex items-center justify-center shrink-0 mr-3'>
              <img src={v.image} alt={v.name} className='max-h-full max-w-full object-contain group-hover:scale-105 transition-transform' />
            </div>

            <div className='flex flex-col flex-1 min-w-0 mr-2'>
              <div className='flex items-center gap-2'>
                <h4 className='font-bold text-lg text-gray-900 leading-tight'>{v.name}</h4>
                <span className='flex items-center gap-0.5 text-xs font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md'>
                  <FaUser className='text-[10px]' /> {v.capacity}
                </span>
              </div>
              <span className='text-xs font-medium text-blue-600 mt-0.5'>{v.eta}</span>
              <p className='text-xs text-gray-500 truncate mt-0.5'>{v.desc}</p>
            </div>

            <div className='text-right shrink-0'>
              <h3 className='text-xl font-extrabold text-gray-900 leading-tight'>₹{typeof v.price === 'number' ? v.price.toFixed(2) : v.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VehiclePanel