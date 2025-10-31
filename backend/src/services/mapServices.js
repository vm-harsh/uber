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




module.exports = { getAddressCoordinates };
