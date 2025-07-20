interface Device {
  _id: string;
  name: string;
  status: string;
  schedule?: { startTime: string; endTime: string };
}

interface DashboardProps {
 devices: Device[];
}


export default function Dashboard({ devices }: DashboardProps) {
  return (
    <div className="space-y-4 mt-36">
      <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {devices.map((device, index) => (
          <div key={index} className="p-4 border rounded-lg bg-[#08021b]">
            <h3 className="font-semibold">{device.name}</h3>
            <p>Status: {device.status}</p>
            {device.schedule && (
              <p>
                Scheduled: {device.schedule.startTime} -{" "}
                {device.schedule.endTime}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 