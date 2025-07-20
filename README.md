# Smart Home Energy Manager AI 🌱⚡️
An autonomous AI agent powered by IO Intelligence APIs to optimize smart home energy use, reduce costs, and minimize environmental impact.

## Concept 🚀
Built for the **Competitive Track: Autonomous Agents in the Real World**, this AI agent leverages IO Intelligence Models and Agents APIs to predict energy needs, control IoT devices, and integrate renewables. It learns user behavior, schedules tasks, and tracks carbon footprint for eco-friendly homes.

## Features & Implementation 🛠️
- **Energy Prediction**: Uses IO Models API (`/chat/completions`) to forecast energy needs from device usage and OpenWeatherMap data. Implemented in `EnergyPrediction.tsx`.
- **Device Control**: Employs IO Agents API (`/workflows/run`) for autonomous device scheduling. Managed via `DeviceControl.tsx`.
- **Eco Tracking**: Calculates carbon footprint using IO Models API. Displayed in `EcoTracking.tsx`.
- **Tech Stack**: MERN monorepo (MongoDB, Express.js, React, Node.js). Frontend: Next.js. Backend: Node.js/Express.js.
- **Data Sources**: OpenWeatherMap for weather, Intelligence.io for predictions and control, simulated energy tariffs.

## Creativity 🎨
- **Creativity**: Combines AI, IoT, and renewable energy in a novel way to address a pressing global issue (energy efficiency).
- **Functionality**: Fully autonomous agent that integrates with real-world devices and data sources, requiring minimal user input.
- **Usefulness**: Saves money, reduces carbon footprint, and enhances user convenience, appealing to eco-conscious consumers and utility providers.