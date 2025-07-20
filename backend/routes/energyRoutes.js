import Router from "express";
import {
 optimizeEnergy, getEnergyStatus, trackCarbonFootprint, getFeatures
} from "../controllers/energyController.js";

const energyRouter = Router();

energyRouter.post("/optimize", optimizeEnergy);
energyRouter.get("/:userId/status", getEnergyStatus);
energyRouter.post('/track-carbon', trackCarbonFootprint);
energyRouter.get("/features", getFeatures)

export default energyRouter;
