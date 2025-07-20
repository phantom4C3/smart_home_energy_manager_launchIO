import mongoose from 'mongoose';
 
const deviceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    description: 'ID of the user owning the device'
  },
  name: {
    type: String,
    required: [true, 'Device name is required'],
    trim: true,
    description: 'Name of the device (e.g., Living Room Light)'
  },
  type: {
    type: String,
    enum: {
      values: ['light', 'thermostat', 'appliance', 'ev_charger'],
      message: '{VALUE} is not a supported device type'
    },
    required: [true, 'Device type is required'],
    description: 'Type of smart home device'
  },
  status: {
    type: String,
    enum: {
      values: ['on', 'off'],
      message: '{VALUE} is not a valid status'
    },
    default: 'off',
    description: 'Current status of the device (on/off)'
  },
  powerUsage: {
    type: Number,
    required: [true, 'Power usage is required'],
    min: [0, 'Power usage cannot be negative'],
    description: 'Power consumption in watts'
  },
  schedule: {
    startTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
      description: 'Start time for scheduled operation (HH:mm)'
    },
    endTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
      description: 'End time for scheduled operation (HH:mm)'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    description: 'Timestamp when the device was created'
  }
}, { timestamps: true });

export default mongoose.model('Device', deviceSchema);