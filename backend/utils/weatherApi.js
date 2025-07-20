import axios from 'axios';
import { config } from '../config/env.js';

const weatherApi = {
  getWeatherData: async (lat = 28.7041, lon = 77.1025) => { 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.OPENWEATHER_API_KEY}&units=metric`
      );

         
       console.log("Debug: Final URL sent to OpenWeatherMap:", response);

      return {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        solarPotential: response.data.weather[0].main === 'Clear' ? 0.9 : 0.3 
      };
    } catch (error) {
      throw new Error(`OpenWeatherMap API error: ${error.response?.data?.message || error.message}`);
    }
  }
};

export default weatherApi;

