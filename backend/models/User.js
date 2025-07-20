import mongoose from 'mongoose';
 
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true, 
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, 
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'], 
  },
  smartHome: {
    devices: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      description: 'References to smart home devices owned by the user'
    }],
    energySources: [{
      type: String,
      enum: {
        values: ['grid', 'solar', 'battery'],
        message: '{VALUE} is not a supported energy source'
      },
      description: 'Available energy sources for the smart home'
    }],
    preferences: {
      priority: {
        type: String,
        enum: {
          values: ['cost', 'comfort', 'eco'],
          message: '{VALUE} is not a valid priority'
        },
        default: 'eco',
        description: 'Optimization priority: cost savings, comfort, or eco-friendliness'
      },
      offPeakHours: {
        type: [String],
        default: ['22:00-06:00'],
        description: 'Time ranges for off-peak energy tariffs (HH:mm-HH:mm)'
      }
    }
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    description: 'References to user-specific notifications about energy management'
  }],
  createdAt: {
    type: Date,
    default: Date.now, 
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
 
