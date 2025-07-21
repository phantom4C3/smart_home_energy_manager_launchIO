"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationList from "@/components/NotificationList";
import Dashboard from "@/components/Dashboard"; 
import { Title } from "@/components/ui/Heading"; 

interface User {
  name: string;
  smartHome: {
    devices: Array<{
      _id: string;
      name: string;
      status: string;
      schedule?: { startTime: string; endTime: string };
    }>;
  };
  notifications: Array<{
    _id: string;
    message: string;
    timestamp: string;
    type: string;
  }>;
}

const mockUser: User = {
  name: "Demo User",
  smartHome: {
    devices: [
      { _id: "d1", name: "Smart Light", status: "on", schedule: { startTime: "08:00", endTime: "18:00" } },
      { _id: "d2", name: "Smart Thermostat", status: "off" },
      { _id: "d3", name: "Smart Plug", status: "on" },
      { _id: "d4", name: "EV Charger", status: "off", schedule: { startTime: "19:00", endTime: "23:00" } },
    ],
  },
  notifications: [
    { _id: "n1", message: "Energy saved today!", timestamp: new Date().toISOString(), type: "info" },
    { _id: "n2", message: "Thermostat turned off.", timestamp: new Date().toISOString(), type: "warning" },
    { _id: "n3", message: "Plug usage exceeded limit.", timestamp: new Date().toISOString(), type: "alert" },
  ],
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user123`
        );
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  const displayUser = user || mockUser;

  return (
    <div className="space-y-8 mx-auto items-center text-center justify-center">
      <Title className="" spanText={`${displayUser.name}`} text={"Welcome, "} />
      <NotificationList notifications={displayUser.notifications || []} />
      <Dashboard devices={displayUser.smartHome.devices || []} /> 
    </div>
  );
}
