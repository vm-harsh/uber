const axios = require('axios');

async function getAddressCoordinates(address) {
  if (!address) throw new Error('Address is required');
  const apiKey = process.env.OPEN_CAGE_API_KEY;
  if (!apiKey) throw new Error('OpenCage API key not set in environment');

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data.results || data.results.length === 0) {
      throw new Error('No results found for address');
    }

    const location = data.results[0].geometry;
    return { lat: location.lat, lng: location.lng };
  } catch (err) {
    throw new Error('Failed to fetch coordinates: ' + err.message);
  }
}

async function getDistanceAndTime(origin, destination) {
  const ORS_API_KEY = process.env.ORS_API_KEY;
  const [originCoords, destCoords] = await Promise.all([
    getAddressCoordinates(origin),
    getAddressCoordinates(destination),
  ]);

  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  const body = {
    coordinates: [
      [originCoords.lng, originCoords.lat],
      [destCoords.lng, destCoords.lat],
    ],
  };

  const response = await axios.post(url, body, {
    headers: { Authorization: ORS_API_KEY, 'Content-Type': 'application/json' },
  });

  const data = response.data.routes[0].summary;

  return {
    origin,
    destination,
    distance: (data.distance / 1000).toFixed(2),
    duration: (data.duration / 60).toFixed(2),
  };
}



async function getAutoCompleteSuggestions(address) {
  const LIQ_API_KEY = process.env.LOCATION_IQ_API_KEY;

  if (!LIQ_API_KEY) {
    throw new Error('LocationIQ API key not set in environment');
  }

  if (!address) {
    throw new Error('Address is required');
  }

  const url = `https://api.locationiq.com/v1/autocomplete?key=${LIQ_API_KEY}&q=${encodeURIComponent(address)}&limit=5&dedupe=1`;

  try {
    const response = await axios.get(url);

    
    const suggestions = response.data.map((item) => ({
      display_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      type: item.type,
    }));

    return suggestions;
  } catch (error) {
    console.error('Autocomplete error:', error.response?.data || error.message);
    throw new Error('Failed to fetch autocomplete suggestions');
  }
}

module.exports = { getAutoCompleteSuggestions };


module.exports = { getAddressCoordinates, getDistanceAndTime, getAutoCompleteSuggestions };
