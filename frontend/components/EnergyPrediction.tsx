'use client';
import { useState } from 'react';
import axios from 'axios';

export default function EnergyPrediction() {
  const [usageData, setUsageData] = useState<string>('100,200,1800,7000');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/energy/optimize`, {
        userId: 'user123',
        usageData: usageData.split(',').map(Number),
        featureId: 1,
        isOffPeak: true
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-black px-2 items-center justify-center text-center">
      <h3 className="text-lg font-semibold">Try Energy Prediction</h3>
      <p>Enter device usage data (comma-separated watts) and predict energy needs.</p>
      <input
        type="text"
        value={usageData}
        onChange={(e) => setUsageData(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="e.g., 100,200,1800,7000"
      />
      <button
        onClick={handlePredict}
        disabled={loading}
        className="px-4 py-2 bg-pink-500 text-white font-semibold rounded font-mona-sans  hover:bg-pink-600 disabled:bg-gray-400 hover:cursor-pointer"
      >
        {loading ? 'Predicting...' : 'Predict Energy'}
      </button>
      {result && (
        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  );
}