import Router from "express";
import {
  createDevice,
  deleteDevice,
  getDevices,
  updateDevice,
} from "../controllers/deviceController.js";

const deviceRouter = Router();

deviceRouter.get("/:userId", getDevices);
deviceRouter.post("/", createDevice);
deviceRouter.post("/:deviceId", updateDevice);
deviceRouter.post("/:deviceId", deleteDevice);

export default deviceRouter;
