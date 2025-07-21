import mongoose from "mongoose";
import { config } from "./env.js";

const connectDB = async () => {
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        heartbeatFrequencyMS: 10000,
      });
      console.log("MongoDB connected successfully!");
      break;
    } catch (error) {
      attempt++;
      console.error(
        `MongoDB connection attempt ${attempt} failed:`,
        error.message
      );
      if (attempt === maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
    }
  }
};

export default connectDB;
