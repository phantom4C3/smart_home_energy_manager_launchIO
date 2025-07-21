"use client";
import { useSearchParams } from "next/navigation";
import { Title } from "@/components/ui/Heading";
import EnergyPrediction from "@/components/EnergyPrediction";
import DeviceControl from "@/components/DeviceControl";
import EcoTracking from "@/components/EcoTracking";

interface Feature {
  id: number;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Energy Prediction",
    description:
      "Predicts energy needs based on device usage and weather conditions, optimizing for cost and eco-friendliness.",
  },
  {
    id: 2,
    title: "Device Control",
    description:
      "Autonomously schedules or controls devices to save energy, such as turning off non-essential devices during peak hours.",
  },
  {
    id: 3,
    title: "Eco Tracking",
    description:
      "Tracks your energy usage and carbon footprint, providing insights to reduce environmental impact.",
  },
];

export default function FeaturesPage() {
const searchParams = useSearchParams();
  const featureId = searchParams.get('feature');
  const selectedFeature = features.find(f => f.id === (featureId ? parseInt(featureId) : null));

  return (
    <div className="space-y-8">
      <Title className="" spanText={"Features"} text={""} />
      {selectedFeature ? (
        <section
          className="p-6 border border-black rounded-lg shadow-md hover:shadow-lg  transition flex flex-col bg-gradient-to-r from-pink-  via-pink-600 via-45%% to-pink-400 mx-auto
      "
          id={`feature-${selectedFeature.id}`}
        >
          <h2 className="text-2xl font-semibold">{selectedFeature.title}</h2>
          <p className="mb-4">{selectedFeature.description}</p>
          <div className="bg-white p-2 rounded-lg">
            {selectedFeature.id === 1 && <EnergyPrediction />}
            {selectedFeature.id === 2 && <DeviceControl />}
            {selectedFeature.id === 3 && <EcoTracking />}
          </div>
        </section>
      ) : (
        <p className="text-red-500">
          No feature selected. Please select a feature from the home page.
        </p>
      )}
    </div>
  );
}
