import express from "express";
import { updateLocation, getLocationById, getAllLatestLocations } from "../controllers/locationController.js";
import { verifyApiKey } from "../middleware/apiKeyMiddleware.js";

const router = express.Router();

// Routes
router.post("/update-location", verifyApiKey, updateLocation);
router.get("/location/:id", getLocationById);
router.get("/locations", getAllLatestLocations);

export default router;
