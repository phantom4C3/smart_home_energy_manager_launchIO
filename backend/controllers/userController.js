import User from '../models/User.js';
import Notification from '../models/Notification.js';
import Device from '../models/Device.js';
 
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.userId })
      .populate('smartHome.devices')
      .populate('notifications')
      .lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    await Device.deleteMany({ userId: req.params.userId });
    await Notification.deleteMany({ userId: req.params.userId });
    res.json({ message: 'User and associated data deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notification = new Notification({ userId, message, type });
    const savedNotification = await notification.save();
    await User.findOneAndUpdate(
      { id: userId },
      { $push: { notifications: savedNotification._id } }
    );
    res.status(201).json(savedNotification.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).lean();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};