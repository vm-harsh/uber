const { getAddressCoordinates, getDistanceAndTime } = require('../services/mapServices');
const { validationResult } = require('express-validator');
const { getAutoCompleteSuggestions } = require('../services/mapServices');

const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ message: "Address query parameter is required" });
  }

  try {
    const location = await getAddressCoordinates(address);
    return res.status(200).json(location);
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return res.status(404).json({ message: "Location not found" });
  }
};

const getDistanceAndTimeController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Both 'origin' and 'destination' query parameters are required" });
  }

  try {
    const result = await getDistanceAndTime(origin, destination);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Distance/Time error:", error.message);
    return res.status(500).json({ message: "Failed to calculate distance or time" });
  }
};




const getAutoCompleteController = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ message: "Address field is required in request body" });
  }

  try {
    const suggestions = await getAutoCompleteSuggestions(address);

    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Autocomplete controller error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch autocomplete suggestions' });
  }
};


module.exports = {getCoordinates,getDistanceAndTimeController,getAutoCompleteController};
