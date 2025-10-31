const { getAddressCoordinates, getDistanceAndTime } = require('../services/mapServices');
const { validationResult } = require('express-validator');

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



module.exports = {getCoordinates};
