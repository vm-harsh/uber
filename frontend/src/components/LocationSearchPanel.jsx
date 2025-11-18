import React from 'react'
import { IoLocation } from "react-icons/io5";


const locations = [
  '6 B.N P.A.C R.R.F Roorkee Road Meerut Uttar Pradesh',
  '123 Main Street, Springfield, IL',
  '456 Elm Street, Metropolis, NY',
  '789 Oak Avenue, Gotham City, NJ'
];

const LocationSearchPanel = ({setIsVehiclePanelOpen,setIsPanelOpen,Suggestions, setSuggestions, activeField, setPickUp, setDestination}) => {
  return (
    <div className='flex flex-col gap-3 pt-10'>

      {Suggestions?.map((location,index) => (
        <div className='flex gap-4 items-center border px-3 py-5 rounded-2xl border-gray-100 active:border-black' key={index} onClick={()=>{
          // setIsPanelOpen(false),
          // setIsVehiclePanelOpen(true)
          if(activeField === 'pickUp'){
            setPickUp(location.display_name);
            setSuggestions([]);
          };
          if(activeField === 'destination'){
            setDestination(location.display_name)
            setSuggestions([]);
          };
        }}>
        <div className='rounded-full bg-[#ededed] flex items-center justify-center p-4'>
          <IoLocation className='text-2xl '/>
        </div>
        <h4 className='font-medium text-xl'>{location.display_name}</h4>
      </div>  
      ))}
    </div>
  )
}

export default LocationSearchPanel