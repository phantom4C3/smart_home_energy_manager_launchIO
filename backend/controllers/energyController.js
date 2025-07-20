import Device from "../models/Device.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import ioApi from "../utils/ioApi.js";
import weatherApi from "../utils/weatherApi.js";

export const optimizeEnergy = async (req, res) => {
  try {
    console.log("1. Starting optimizeEnergy function...");
    const { userId, usageData, featureId } = req.body;
    console.log("2. Received request body:", req.body);

    console.log("3. Calling Weather API...");
    const weather = await weatherApi.getWeatherData();
    console.log("4. Weather data received successfully:", weather);

    console.log("5. Calling IO API prediction model...");
    const prediction = await ioApi.predictEnergy({
      usage: usageData,
      weather: weather,
    });
    console.log("6. IO API prediction received successfully:", prediction);

    const devices = await Device.find({ userId }).lean();
    console.log("6a. Found devices for user:", devices.length);
    const isOffPeak = req.body.isOffPeak || false;
    console.log("6b. isOffPeak:", isOffPeak);

    const actions = devices.map((device) => {
      const action = device.powerUsage > 1000 && isOffPeak ? "schedule" : "off";
      console.log(
        `6c. Device ${device._id}: powerUsage=${device.powerUsage}, isOffPeak=${isOffPeak}, Action=${action}`
      );
      return {
        deviceId: device._id,
        action: action,
      };
    });

    console.log("7. Calling IO API for device actions...");
    const actionResult = await ioApi.executeDeviceActions(actions);
    console.log("8. IO API actions executed successfully:", actionResult);

    console.log("9. Creating notification...");
    const notification = new Notification({
      userId,
      message: `Optimized energy usage for feature ${featureId} with ${devices.length} devices.`,
      type: "schedule",
    });
    const savedNotification = await notification.save();
    console.log("10. Notification saved:", savedNotification._id);

    console.log("11. Updating user notifications...");
    await User.findOneAndUpdate(
      { id: userId },
      { $push: { notifications: savedNotification._id } }
    );
    console.log("12. User notifications updated.");

    res.json({
      prediction,
      actions: actionResult,
      notification: savedNotification.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const trackCarbonFootprint = async (req, res) => {
  try {
    console.log("1. Starting trackCarbonFootprint function...");

    const { userId, energyData } = req.body;
    console.log("2. Received request body:", req.body);

    console.log("3. Fetching devices for user...");
    const devices = await Device.find({ userId }).lean();
    console.log("4. Found devices:", devices.length);

    console.log("5. Calculating total energy from devices...");
    const totalEnergy = devices.reduce((sum, device) => {
      console.log(`  Device ${device._id} power usage: ${device.powerUsage}`);
      return sum + device.powerUsage;
    }, 0);
    console.log("6. Total energy calculated:", totalEnergy);

    console.log("7. Calling IO API for carbon footprint calculation...");
    const carbonFootprint = await ioApi.getCarbonFootprint({
      totalEnergy,
      ...energyData,
    });
    console.log(
      "8. IO API carbon footprint received successfully:",
      carbonFootprint
    );

    console.log("9. Creating carbon footprint notification...");
    const notification = new Notification({
      userId,
      message: `Carbon footprint calculated: ${carbonFootprint.co2} kg CO2.`,
      type: "savings",
    });
    const savedNotification = await notification.save();
    console.log(
      "10. Carbon footprint notification saved:",
      savedNotification._id
    );

    console.log("11. Updating user notifications...");
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { notifications: savedNotification._id } }
    );
    console.log("12. User notifications updated.");

    res.json({ carbonFootprint, notification: savedNotification.toJSON() });
  } catch (error) {
    console.error("Critical Error in trackCarbonFootprint:", error);
    res.status(500).json({
      message: "Internal Server Error",
      details: error.message,
    });
  }
};

export const getEnergyStatus = async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.params.userId }).lean();
    const weather = await weatherApi.getWeatherData();
    const prediction = await ioApi.predictEnergy({
      usage: devices.map((d) => d.powerUsage),
    });
    res.json({ devices, weather, prediction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeatures = async (req, res) => {
  const features = [
    {
      id: 1,
      title: "Energy Prediction",
      description: "Predicts energy needs based on usage and weather.",
    },
    {
      id: 2,
      title: "Device Control",
      description: "Autonomously controls devices to save energy.",
    },
    {
      id: 3,
      title: "Eco Tracking",
      description: "Tracks and reduces your carbon footprint.",
    },
  ];
  res.json(features);
};
