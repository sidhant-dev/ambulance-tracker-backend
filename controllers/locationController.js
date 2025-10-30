import Location from "../models/locationModel.js";

// POST /api/update-location  → From Arduino
export const updateLocation = async (req, res) => {
  try {
    console.log("Incoming /update-location body:", req.body, "headers:", req.headers);
    const { id, lat, lng } = req.body;
    if (!id || !lat || !lng) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await Location.create({ ambulanceId: id, lat, lng });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/location/:id → Get single ambulance latest location
export const getLocationById = async (req, res) => {
  try {
    const data = await Location.findOne({ ambulanceId: req.params.id }).sort({ timestamp: -1 });
    if (!data) return res.status(404).json({ message: "Ambulance not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/locations → Get latest of all ambulances
export const getAllLatestLocations = async (req, res) => {
  try {
    const data = await Location.aggregate([
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$ambulanceId", latest: { $first: "$$ROOT" } } }
    ]);
    res.json(data.map(d => d.latest));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
