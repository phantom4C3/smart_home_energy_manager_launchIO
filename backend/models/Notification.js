import mongoose from 'mongoose';
 
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'], 
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: {
      values: ['alert', 'schedule', 'savings'],
      message: '{VALUE} is not a valid notification type'
    },
    default: 'alert',
    description: 'Type of notification: alert, schedule, or savings'
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  }
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);