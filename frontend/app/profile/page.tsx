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

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/user123`);
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

  return (
    <div className="space-y-8 mx-auto items-center text-center justify-center">
      <Title className="" spanText={`${user?.name}`} text={"Welcome, "} /> 
      <NotificationList notifications={user?.notifications || []} /> 
      <Dashboard devices={user?.smartHome.devices || []} />
    </div>
  );
}
 
