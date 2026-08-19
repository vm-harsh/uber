import React, { useContext, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";

import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { UserContext } from '../context/UserProvider';
import { SocketContext } from '../context/SocketProvider';
import { useEffect } from 'react';
import LiveRideMap from '../components/LiveRideMap';

const Home = () => {
  const {serverURL,user} = useContext(UserContext);
  const[pickUp,setPickUp] = useState('');
  const[destination,setDestination] = useState('');
  const[suggestions,setSuggestions] = useState([]);
  const[activeField, setActiveField] = useState('');
  const[isPanelOpen,setIsPanelOpen] = useState(false);
  const[isVehiclePanelOpen,setIsVehiclePanelOpen] = useState(false);
  const[isConfirmRidePanelOpen,setIsConfirmRidePanelOpen] = useState(false);
  const[isVehicleFoundPanel,setIsVehicleFoundPanel] = useState(false);
  const[iswaitingForDriverPanel,setIsWaitingForDriverPanel] = useState(false);
  const[vehicleType,setVehicleType] = useState('');
  const[fairs,setFairs] = useState(null);
  const[err,setErr] = useState(false);
  const[activeRide,setActiveRide] = useState(null);
  const[captainLocation,setCaptainLocation] = useState(null);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicelFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const {sendMessageToEvent, receiveMessageFromEvent} = useContext(SocketContext);

  const closeAllBottomPanels = () => {
    setIsVehiclePanelOpen(false);
    setIsConfirmRidePanelOpen(false);
    setIsVehicleFoundPanel(false);
    setIsWaitingForDriverPanel(false);
  };

  const openSearchPanel = (field) => {
    setActiveField(field);
    setIsPanelOpen(true);
    closeAllBottomPanels();
  };

  useEffect(()=>{
    if (!user?._id) {
      return;
    }

    sendMessageToEvent('join',{userId:user._id, userType:'user'});
  },[user, sendMessageToEvent])

  useEffect(() => {
    const unsubscribe = receiveMessageFromEvent('ride-confirmed', (rideData) => {
      setActiveRide(rideData);
      if (rideData?.captain?.location) {
        setCaptainLocation(rideData.captain.location);
      }
      setIsPanelOpen(false);
      setIsVehiclePanelOpen(false);
      setIsConfirmRidePanelOpen(false);
      setIsVehicleFoundPanel(false);
      setIsWaitingForDriverPanel(true);
    });

    return unsubscribe;
  }, [receiveMessageFromEvent]);

  useEffect(() => {
    const unsubscribe = receiveMessageFromEvent('captain-location-updated', (payload) => {
      if (!payload?.location) {
        return;
      }

      if (activeRide?._id && payload.rideId && payload.rideId !== activeRide._id) {
        return;
      }

      setCaptainLocation(payload.location);
    });

    return unsubscribe;
  }, [receiveMessageFromEvent, activeRide]);

  

  useGSAP(()=>{
    gsap.to(panelRef.current,{
      height: isPanelOpen ? '70%' : '0%',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  },[isPanelOpen])

  useGSAP(()=>{
    gsap.to(vehiclePanelRef.current,{
      transform: isVehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  },[isVehiclePanelOpen])

  useGSAP(()=>{
    gsap.to(confirmRidePanelRef.current,{
      transform: isConfirmRidePanelOpen ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  },[isConfirmRidePanelOpen])

  useGSAP(()=>{
    gsap.to(vehicelFoundRef.current,{
      transform: isVehicleFoundPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  },[isVehicleFoundPanel])

  useGSAP(()=>{
    gsap.to(waitingForDriverRef.current,{
      transform: iswaitingForDriverPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    })
},[iswaitingForDriverPanel])

  const getSuggestions = async (address) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/map/get-address-suggestions`,
      {},  // empty body (if needed)
      {
        params: { address },
        withCredentials: true
      }
    );

    setSuggestions(response.data.suggestions);
    console.log(response.data);

  } catch (err) {
    console.log("Suggestion failed", err);
  }
};


const findTrip = () => {
  if(!pickUp || !destination){
    setErr('Please select a valid location');
    return;
  }
  setErr(false);
  const getFair = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/ride/get-fare",
        {pickUp,destination},
        {
          withCredentials: true,
        }
      );
      
      if(response.status === 200){
        setFairs(response.data);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  }

  getFair(pickUp,destination);
  
  closeAllBottomPanels();
  setIsVehiclePanelOpen(true);
  setIsPanelOpen(false);
    

}

const createRide = async () => {
  try {
    const response = await axios.post(`${serverURL}/api/ride/create`,{
      pickup:pickUp,
      destination:destination,
      vehicleType:vehicleType
    },{withCredentials:true});

    if(response.status === 201){
      console.log(response.data);
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}




  return (
    <div>
      <div className='w-full h-screen relative'>

        <div className='absolute inset-0 z-0'>
          <LiveRideMap captainLocation={captainLocation}/>
        </div>

        <img src='https://imgs.search.brave.com/lM0xhQNGRYYDXm7242HMViQjKMFXw2crF0SuCdqEwD8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy81/LzU4L1ViZXJfbG9n/b18yMDE4LnN2Zw' className='w-25 mb-15 absolute top-10 right-5 z-1200'/>

        <div className={`flex flex-col justify-end h-screen absolute top-0 left-0 w-full overflow-hidden z-1200`}>
          <div className=' p-5 h-[30%] bg-white rounded-t-2xl relative max-h-70'>
            <div className='w-1 h-28 rounded-full bg-black absolute top-25 left-8'></div>
            <button className={`absolute right-5 text-2xl text-gray-800 ${isPanelOpen ? 'visible' : 'hidden'}`} onClick={()=>setIsPanelOpen(false)}><MdKeyboardArrowDown /></button>
            <h2 className='text-2xl mb-6 font-bold text-gray-800'>Find a trip</h2>
            <form>
              <input className='px-8 py-6 bg-[#ededed] w-full text-xl rounded-xl mb-3 outline-yellow-500' value={pickUp} placeholder='Add a pickup location' onClick={()=>{openSearchPanel('pickUp')}} 
              onChange={(e)=>{setPickUp(e.target.value); getSuggestions(e.target.value)}}/>
              <input className='px-8 py-6 bg-[#ededed] w-full text-xl rounded-xl outline-yellow-500' value={destination} placeholder='Enter your destination' onClick={()=>{openSearchPanel('destination')}} 
              onChange={(e) => {setDestination(e.target.value); getSuggestions(e.target.value)}}/>
            </form>
            {err && <p className='text-center text-red-400 text-lg mt-1'>{err}</p>}
            <button className=' flex items-center justify-center w-full py-3 mt-3 bg-black text-white text-xl rounded-xl cursor-pointer' 
              onClick={findTrip}
            >Find trip</button>
            </div>
            <div  ref={panelRef} className={`h-0 bg-white px-7`}>
              <LocationSearchPanel activeField={activeField} setPickUp={setPickUp} setDestination={setDestination} setSuggestions={setSuggestions} Suggestions={suggestions} setIsVehiclePanelOpen={setIsVehiclePanelOpen} setIsPanelOpen={setIsPanelOpen}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white px-5 py-12 translate-y-full rounded-2xl' ref={vehiclePanelRef}>
              <VehiclePanel setVehicleType={setVehicleType} setIsVehiclePanelOpen={setIsVehiclePanelOpen} setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen} fairs={fairs}  />
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl' ref={confirmRidePanelRef}>
              <ConfirmRide fair={vehicleType && fairs && fairs[vehicleType]} pickUp={pickUp} destination={destination} createRide={createRide} setIsConfirmRidePanelOpen={setIsConfirmRidePanelOpen} setIsVehicleFoundPanel={setIsVehicleFoundPanel}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl' ref={vehicelFoundRef}>
              <LookingForDriver fair={vehicleType && fairs && fairs[vehicleType]} pickUp={pickUp} destination={destination} setIsVehicleFoundPanel={setIsVehicleFoundPanel}/>
            </div>
            <div className='fixed bottom-0 w-full bg-white py-12 translate-y-full rounded-2xl' ref={waitingForDriverRef}>
              <WaitingForDriver ride={activeRide} setIsWaitingForDriverPanel={setIsWaitingForDriverPanel}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home 