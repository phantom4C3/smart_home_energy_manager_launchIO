import Device from '../models/Device.js';
import User from '../models/User.js';
 
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.params.userId }).lean();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDevice = async (req, res) => {
  try {
    const device = new Device(req.body);
    const savedDevice = await device.save();
    await User.findOneAndUpdate(
      { id: req.body.userId },
      { $push: { 'smartHome.devices': savedDevice._id } }
    );
    res.status(201).json(savedDevice.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.deviceId,
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!device) return res.status(404).json({ error: 'Device not found' });
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.deviceId);
    if (!device) return res.status(404).json({ error: 'Device not found' });
    await User.findOneAndUpdate(
      { id: device.userId },
      { $pull: { 'smartHome.devices': device._id } }
    );
    res.json({ message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};