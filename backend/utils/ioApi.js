import axios from "axios";
import { config } from "../config/env.js";

const ioApi = {
  predictEnergy: async (data) => {
    const endpoint = "/chat/completions";
    const fullUrl = `${config.IO_API_BASE_URL}${endpoint}`;
    const maskedApiKey = config.IO_API_KEY
      ? `${config.IO_API_KEY.substring(0, 5)}...`
      : "Not Set";

    const promptContent = `Given the usage data: ${JSON.stringify(
      data.usage
    )} and current weather conditions: ${JSON.stringify(
      data.weather
    )}, predict the total energy consumption in kWh for the next 24 hours. Provide the prediction as a JSON object with a 'predictedEnergy' field in kWh.`;

    const requestBody = {
      model: "meta-llama/Llama-3.3-70B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant specialized in energy prediction. Provide precise predictions in JSON format. Your output MUST be ONLY the JSON object, with no additional text or conversational filler.",
        },
        { role: "user", content: promptContent },
      ],
      temperature: 0.1,
      max_completion_tokens: 200,
    };

    console.log(`[ioApi] Calling predictEnergy (via /chat/completions)...`);
    console.log(`[ioApi]   URL: ${fullUrl}`);
    console.log(`[ioApi]   API Key (masked): ${maskedApiKey}`);
    console.log(
      `[ioApi]   Request Body: ${JSON.stringify(requestBody, null, 2)}`
    );

    try {
      const response = await axios.post(fullUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${config.IO_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      console.log(
        `[ioApi] predictEnergy - Response Status: ${response.status}`
      );
      console.log(
        `[ioApi] predictEnergy - Raw LLM Response Data: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );

      const llmOutputContent = response.data?.choices?.[0]?.message?.content;

      if (llmOutputContent) {
        try {
          const parsedPrediction = JSON.parse(llmOutputContent);
          console.log(
            `[ioApi] predictEnergy - Parsed Prediction:`,
            parsedPrediction
          );
          return parsedPrediction;
        } catch (parseError) {
          console.error(
            `[ioApi] predictEnergy - Failed to parse LLM output as JSON:`,
            parseError
          );
          console.error(
            `[ioApi] predictEnergy - Unparsable LLM output:`,
            llmOutputContent
          );
          throw new Error(
            `IO Models API error: Malformed JSON from LLM: ${parseError.message}`
          );
        }
      } else {
        console.warn(
          `[ioApi] predictEnergy - LLM response did not contain expected content.`
        );
        throw new Error(`IO Models API error: LLM response missing content.`);
      }
    } catch (error) {
      console.error(`[ioApi] predictEnergy - API Error:`, error.message);
      if (error.response) {
        console.error(
          `[ioApi] predictEnergy - Error Status: ${error.response.status}`
        );
        console.error(
          `[ioApi] predictEnergy - Error Data: ${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
        console.error(
          `[ioApi] predictEnergy - Error Headers: ${JSON.stringify(
            error.response.headers,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.error(
          `[ioApi] predictEnergy - No response received from API. Request:`,
          error.request
        );
      } else {
        console.error(
          `[ioApi] predictEnergy - Error in setting up request:`,
          error.message
        );
      }
      throw new Error(
        `IO Models API error (predictEnergy): ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  executeDeviceActions: async (actions) => {
    const workflowId = "device-control-workflow";
    const endpoint = `/workflows/${workflowId}/run`;
    const fullUrl = `${config.IO_API_BASE_URL}${endpoint}`;
    const maskedApiKey = config.IO_API_KEY
      ? `${config.IO_API_KEY.substring(0, 5)}...`
      : "Not Set";

    const requestBody = {
      inputs: {
        deviceActions: actions,
      },
    };

    console.log(`[ioApi] Calling executeDeviceActions (via /workflows/run)...`);
    console.log(`[ioApi]   URL: ${fullUrl}`);
    console.log(`[ioApi]   API Key (masked): ${maskedApiKey}`);
    console.log(
      `[ioApi]   Request Body: ${JSON.stringify(requestBody, null, 2)}`
    );

    try {
      const response = await axios.post(fullUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${config.IO_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      console.log(
        `[ioApi] executeDeviceActions - Response Status: ${response.status}`
      );
      console.log(
        `[ioApi] executeDeviceActions - Raw Response Data: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );

      const workflowOutput = response.data;
      if (workflowOutput) {
        console.log(
          `[ioApi] executeDeviceActions - Workflow Output:`,
          workflowOutput
        );
        return workflowOutput;
      } else {
        console.warn(
          `[ioApi] executeDeviceActions - Workflow response did not contain expected content.`
        );
        throw new Error(
          `IO Agents API error: Workflow response missing content.`
        );
      }
    } catch (error) {
      console.error(`[ioApi] executeDeviceActions - API Error:`, error.message);
      if (error.response) {
        console.error(
          `[ioApi] executeDeviceActions - Error Status: ${error.response.status}`
        );
        console.error(
          `[ioApi] executeDeviceActions - Error Data: ${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
        console.error(
          `[ioApi] executeDeviceActions - Error Headers: ${JSON.stringify(
            error.response.headers,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.error(
          `[ioApi] executeDeviceActions - No response received from API. Request:`,
          error.request
        );
      } else {
        console.error(
          `[ioApi] executeDeviceActions - Error in setting up request:`,
          error.message
        );
      }
      throw new Error(
        `IO Agents API error (executeDeviceActions): ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },

  getCarbonFootprint: async (energyData) => {
    const endpoint = "/chat/completions";
    const fullUrl = `${config.IO_API_BASE_URL}${endpoint}`;
    const maskedApiKey = config.IO_API_KEY
      ? `${config.IO_API_KEY.substring(0, 5)}...`
      : "Not Set";

    const promptContent = `Calculate the carbon footprint in kg CO2e for the following energy consumption data: ${JSON.stringify(
      energyData
    )}. Provide the result as a JSON object with a 'co2' field.`;

    const requestBody = {
      model: "meta-llama/Llama-3.3-70B-Instruct",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant specialized in environmental impact calculations. Provide accurate carbon footprint results in JSON format. Your output MUST be ONLY the JSON object, with no additional text or conversational filler.",
        },
        { role: "user", content: promptContent },
      ],
      temperature: 0.1,
      max_completion_tokens: 200,
    };

    console.log(
      `[ioApi] Calling getCarbonFootprint (via /chat/completions)...`
    );
    console.log(`[ioApi]   URL: ${fullUrl}`);
    console.log(`[ioApi]   API Key (masked): ${maskedApiKey}`);
    console.log(
      `[ioApi]   Request Body: ${JSON.stringify(requestBody, null, 2)}`
    );

    try {
      const response = await axios.post(fullUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${config.IO_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      console.log(
        `[ioApi] getCarbonFootprint - Response Status: ${response.status}`
      );
      console.log(
        `[ioApi] getCarbonFootprint - Raw LLM Response Data: ${JSON.stringify(
          response.data,
          null,
          2
        )}`
      );

      const llmOutputContent = response.data?.choices?.[0]?.message?.content;

      if (llmOutputContent) {
        try {
          const parsedCarbonFootprint = JSON.parse(llmOutputContent);
          console.log(
            `[ioApi] getCarbonFootprint - Parsed Carbon Footprint:`,
            parsedCarbonFootprint
          );
          return parsedCarbonFootprint;
        } catch (parseError) {
          console.error(
            `[ioApi] getCarbonFootprint - Failed to parse LLM output as JSON:`,
            parseError
          );
          console.error(
            `[ioApi] getCarbonFootprint - Unparsable LLM output:`,
            llmOutputContent
          );
          throw new Error(
            `IO Models API error: Malformed JSON from LLM: ${parseError.message}`
          );
        }
      } else {
        console.warn(
          `[ioApi] getCarbonFootprint - LLM response did not contain expected content.`
        );
        throw new Error(`IO Models API error: LLM response missing content.`);
      }
    } catch (error) {
      console.error(`[ioApi] getCarbonFootprint - API Error:`, error.message);
      if (error.response) {
        console.error(
          `[ioApi] getCarbonFootprint - Error Status: ${error.response.status}`
        );
        console.error(
          `[ioApi] getCarbonFootprint - Error Data: ${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
        console.error(
          `[ioApi] getCarbonFootprint - Error Headers: ${JSON.stringify(
            error.response.headers,
            null,
            2
          )}`
        );
      } else if (error.request) {
        console.error(
          `[ioApi] getCarbonFootprint - No response received from API. Request:`,
          error.request
        );
      } else {
        console.error(
          `[ioApi] getCarbonFootprint - Error in setting up request:`,
          error.message
        );
      }
      throw new Error(
        `IO Models API error (getCarbonFootprint): ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
};

export default ioApi;
