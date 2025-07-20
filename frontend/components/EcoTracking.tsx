'use client';
import { useState } from 'react';
import axios from 'axios';

export default function EcoTracking() {
  const [energyData, setEnergyData] = useState<string>('1000');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/energy/track-carbon`, {
        userId: 'user123',
        energyData: { totalWatts: Number(energyData) },
        featureId: 3
      });
      setResult(JSON.stringify(response.data, null, 2));
    }  catch (error: unknown) {
      if (error instanceof Error) setResult(`Error: ${error.message}`);
    
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="space-y-4 text-black px-2 items-center justify-center text-center">
      <h3 className="text-lg font-semibold">Try Eco Tracking</h3>
      <p>Track your carbon footprint based on energy usage.</p>
      <input
        type="number"
        value={energyData}
        onChange={(e) => setEnergyData(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Total energy usage (watts)"
      />
      <button
        onClick={handleTrack}
        disabled={loading}
        className="px-4 py-2 bg-pink-500 text-white rounded font-mona-sans font-semibold hover:bg-pink-600 hover:cursor-pointer disabled:bg-gray-400"
      >
        {loading ? 'Tracking...' : 'Track Carbon Footprint'}
      </button>
      {result && (
        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  );
}