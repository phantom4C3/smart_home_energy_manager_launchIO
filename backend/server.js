import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
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

const PORT = config.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
