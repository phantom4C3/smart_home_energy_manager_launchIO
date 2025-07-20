import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import energyRoutes from "./routes/energyRoutes.js"; 

const app = express(); 

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/energy", energyRoutes);

export default app;