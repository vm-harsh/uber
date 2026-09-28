import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdHistory } from "react-icons/md";

const DEFAULT_POPULAR_LOCATIONS = [
  {
    name: 'Connaught Place',
    secondary: 'Central Delhi, New Delhi, Delhi',
    display_name: 'Connaught Place, Central Delhi, New Delhi, Delhi',
    lat: 28.6315,
    lon: 77.2167
  },
  {
    name: 'Indira Gandhi International Airport (DEL)',
    secondary: 'New Delhi, Delhi 110037',
    display_name: 'Indira Gandhi International Airport (DEL), New Delhi, Delhi 110037',
    lat: 28.5562,
    lon: 77.1000
  },
  {
    name: 'Cyber Hub, DLF Phase 2',
    secondary: 'Sector 24, Gurugram, Haryana',
    display_name: 'Cyber Hub, DLF Phase 2, Sector 24, Gurugram, Haryana',
    lat: 28.4952,
    lon: 77.0892
  },
  {
    name: 'Hauz Khas Village',
    secondary: 'Deer Park, Hauz Khas, New Delhi',
    display_name: 'Hauz Khas Village, Deer Park, Hauz Khas, New Delhi',
    lat: 28.5535,
    lon: 77.1944
  }
];

const LocationSearchPanel = ({
  setIsVehiclePanelOpen,
  setIsPanelOpen,
  Suggestions,
  setSuggestions,
  activeField,
  setPickUp,
  setDestination,
  setPickUpCoords,
  setDestinationCoords
}) => {
  const handleSelect = (location) => {
    const full = location.display_name || location.name || '';
    const coords = location.lat && location.lon ? { lat: Number(location.lat), lng: Number(location.lon) } : null;

    if (activeField === 'pickUp') {
      setPickUp(full);
      if (setPickUpCoords && coords) {
        setPickUpCoords(coords);
      }
    } else if (activeField === 'destination') {
      setDestination(full);
      if (setDestinationCoords && coords) {
        setDestinationCoords(coords);
      }
    }
    setSuggestions([]);
  };

  const itemsToDisplay = Suggestions && Suggestions.length > 0 ? Suggestions : DEFAULT_POPULAR_LOCATIONS;
  const isDefault = !Suggestions || Suggestions.length === 0;

  return (
    <div className='flex flex-col gap-2.5 py-3 max-h-[55vh] overflow-y-auto pr-1'>
      <div className='text-xs font-semibold uppercase tracking-wider text-gray-400 px-1 mb-1'>
        {isDefault ? 'Popular Places' : 'Search Results'}
      </div>

      {itemsToDisplay.map((location, index) => {
        const full = location.display_name || location.name || '';
        const parts = full.split(',');
        const primary = parts[0] || full;
        const secondary = parts.slice(1).join(',').trim() || location.secondary || '';

        return (
          <div
            key={index}
            onClick={() => handleSelect(location)}
            className='flex items-center gap-3.5 p-3 rounded-xl bg-gray-50/80 hover:bg-gray-100 active:scale-[0.99] border border-gray-100 transition-all cursor-pointer'
          >
            <div className='w-10 h-10 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-700 shrink-0'>
              {isDefault ? <MdHistory className='text-xl text-gray-500' /> : <IoLocationSharp className='text-xl text-black' />}
            </div>
            <div className='flex flex-col min-w-0 flex-1'>
              <h4 className='font-semibold text-base text-gray-900 truncate'>{primary}</h4>
              {secondary && (
                <p className='text-xs text-gray-500 truncate'>{secondary}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default LocationSearchPanel
