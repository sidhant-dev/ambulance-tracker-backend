import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import locationRoutes from "./routes/locationRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Root route
app.get("/", (req, res) => {
  res.send("🚑 Ambulance Tracking API is running...");
});

// Routes
app.use("/api", locationRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
