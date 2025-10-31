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
    distance_km: (data.distance / 1000).toFixed(2),
    duration_min: (data.duration / 60).toFixed(2),
  };
}


module.exports = { getAddressCoordinates, getDistanceAndTime };
