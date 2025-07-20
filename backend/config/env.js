import dotenv from "dotenv";

dotenv.config({ path: './backend/.env' });
 
export const config = {
  MONGO_URI: process.env.MONGO_URI ,
  IO_API_KEY: process.env.IO_API_KEY ,
  IO_API_BASE_URL: process.env.IO_API_BASE_URL ,
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.PORT
};
