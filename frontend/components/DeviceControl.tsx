'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Device {
  _id: string;
  name: string;
  status: string;
  powerUsage: number;
}

export default function DeviceControl() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/devices/user123`);
        setDevices(response.data);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };
    fetchDevices();
  }, []);

  const handleControl = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/energy/optimize`, {
        userId: 'user123',
        usageData: devices.map(d => d.powerUsage || 0),
        featureId: 2,
        isOffPeak: true
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-black px-2 items-center justify-center text-center">
      <h3 className="text-lg font-semibold">Try Device Control</h3>
      <p>Control devices based on energy optimization.</p>
      <div>
        <h4 className="font-medium">Available Devices:</h4>
        <ul className="list-disc pl-6">
          {devices.map(device => (
            <li key={device._id} className='text-left'>{device.name} ({device.status})</li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleControl}
        disabled={loading || devices.length === 0}
        className="px-4 py-2 bg-pink-500 text-white rounded font-mona-sans font-semibold hover:bg-pink-600 hover:cursor-pointer disabled:bg-gray-400"
      >
        {loading ? 'Controlling...' : 'Control Devices'}
      </button>
      {result && (
        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </div>
  );
}