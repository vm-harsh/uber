import React, { useRef, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {
  const[pickUp,setPickUp] = useState('');
  const[destination,setDestination] = useState('');
  const[isPanelOpen,setIsPanelOpen] = useState(false);
  const[isVehiclePanelOpen,setIsVehiclePanelOpen] = useState(false);
  const[isConfirmRidePanelOpen,setIsConfirmRidePanelOpen] = useState(false);
  const[isVehicleFoundPanel,setIsVehicleFoundPanel] = useState(false);
  const[iswaitingForDriverPanel,setIsWaitingForDriverPanel] = useState(true);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicelFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  useGSAP(()=>{
    gsap.to(panelRef.current,{
      height: isPanelOpen ? '70%' : '0%',
      duration: 0.5,
      ease: 'power2.out'
    })
  },[isPanelOpen])

  useGSAP(()=>{
  if(isVehiclePanelOpen){
    gsap.to(vehiclePanelRef.current,{
    transform: 'translateY(0)'
  })
  }
  else{
    gsap.to(vehiclePanelRef.current,{
    transform: 'translateY(100%)'
  })
  }
  },[isVehiclePanelOpen])

  useGSAP(()=>{
  if(isConfirmRidePanelOpen){
    gsap.to(confirmRidePanelRef.current,{
    transform: 'translateY(0)'
  })
  }
  else{
    gsap.to(confirmRidePanelRef.current,{
    transform: 'translateY(100%)'
  })
  }
  },[isConfirmRidePanelOpen])

  useGSAP(()=>{
    if(isVehicleFoundPanel){
      gsap.to(vehicelFoundRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehicelFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[isVehicleFoundPanel])

  useGSAP(()=>{
    if(iswaitingForDriverPanel){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
},[iswaitingForDriverPanel])

  return (
    <div>
      <div className='w-full h-screen relative'>

        <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-35 mb-15 absolute top-10 left-5'/>

        <img src='https://imgs.search.brave.com/PGPRil5Jz9rjEuBW1RmTIsQvLLXiS61EU_JCixHhyzw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdHJhbnNwb3J0/LXNlcnZpY2UtYXBw/LXRlY2hub2xvZ3kt/aWNvbl8yNDkwOC0y/ODQyNC5qcGc_c2Vt/dD1haXNfaHlicmlk/Jnc9NzQwJnE9ODA' className='w-full h-full'/>
        <div className={`flex flex-col justify-end h-screen absolute top-0 left-0 w-full overflow-hidden`}>
          <div className=' p-5 h-[30%] bg-white rounded-t-2xl relative max-h-70'>
            <div className='w-1 h-28 rounded-full bg-black absolute top-25 left-8'></div>
            <button className={`absolute right-5 text-2xl text-gray-800 ${isPanelOpen ? 'visible' : 'hidden'}`} onClick={()=>setIsPanelOpen(false)}><MdKeyboardArrowDown /></button>
            <h2 className='text-2xl mb-6 font-bold text-gray-800'>Find a trip</h2>
            <form>
              <input className='px-8 py-6 bg-[#ededed] w-full text-xl rounded-xl mb-3 outline-yellow-500' value={pickUp} placeholder='Add a pickup location' onClick={()=>setIsPanelOpen(true)} onChange={(e)=>setPickUp(e.target.value)}/>
              <input className='px-8 py-6 bg-[#ededed] w-full text-xl rounded-xl outline-yellow-500' value={destination} placeholder='Enter your destination' onClick={()=>setIsPanelOpen(true)} onChange={(e) => setDestination(e.target.value)}/>
            </form>
            </div>
            <div  ref={panelRef} className={`h-0 bg-white px-7`}>
              <LocationSearchPanel setIsVehiclePanelOpen={setIsVehiclePanelOpen} setIsPanelOpen={setIsPanelOpen}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white px-5 py-12 translate-y-full rounded-2xl' ref={vehiclePanelRef}>
              <VehiclePanel setIsVehiclePanelOpen={setIsVehiclePanelOpen} setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl' ref={confirmRidePanelRef}>
              <ConfirmRide setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen} setIsVehicleFoundPanel={setIsVehicleFoundPanel}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl' ref={vehicelFoundRef}>
              <LookingForDriver setIsVehicleFoundPanel={setIsVehicleFoundPanel}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 rounded-2xl' ref={waitingForDriverRef}>
              <WaitingForDriver setIsWaitingForDriverPanel={setIsWaitingForDriverPanel}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home 