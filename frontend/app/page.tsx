"use client";
import { useRouter } from "next/navigation"; 
import { TagLine, Title } from "../components/ui/Heading";
import FeatureCard from "../components/FeatureCard";
import Image from "next/image";
import slide_image3 from "../public/silde_image (3).jpg";
import slide_image6 from "../public/silde_image (6).jpeg"; 

const features = [
  {
    id: 1,
    title: 'Energy Prediction',
    description: 'Predicts energy needs based on device usage and weather conditions, optimizing for cost and eco-friendliness.'
  },
  {
    id: 2,
    title: 'Device Control',
    description: 'Autonomously schedules or controls devices to save energy, such as turning off non-essential devices during peak hours.'
  },
  {
    id: 3,
    title: 'Eco Tracking',
    description: 'Tracks your energy usage and carbon footprint, providing insights to reduce environmental impact.'
  }
];

export default function HomePage() {
  const router = useRouter();  

  const handleFeatureClick = (id: number) => {
    router.push(`/features#feature-${id}`);
  };

  return (
    <div className="space-y-8 text-white scroll-smooth mx-auto text-center items-center justify-center">
      <section className="text-center">
        <Title
          className="max-w-[38rem] mx-auto"
          spanText={"AI Agent"}
          text={"Smart Energy Manager"}
        />
        <p className="text-lg mt-4">
          An AI-powered solution to optimize your home’s energy usage.
        </p>
        <Image
          alt="hero"
          src={slide_image3}
          className="mt-8 mx-auto lg:max-w-[56rem]  md:max-w-[26rem] rounded-lg sm:max-w-[12rem]"
        />
      </section>

      <section className="mt-36">
        <Title
          className="max-w-[26rem] mx-auto"
          spanText={"Future"}
          text={"Take control of your"}
        />
        <p className="mb-4 mt-4 max-w-[52rem] mx-auto">
          Our AI agent reduces energy costs, minimizes environmental impact, and
          enhances convenience by autonomously managing your smart home devices
          using IO Intelligence APIs.
        </p>
        <ul className="list-disc pl-6 md:pl-48 lg:pl-85 xl:pl-118 2xl:pl-150">
          <li className="text-left">Saves up to 20% on energy bills.</li>
          <li className="text-left">Maximizes renewable energy usage (solar, battery).</li>
          <li className="text-left">Reduces carbon footprint with real-time tracking.</li>
        </ul>
        <Image
          alt="hero"
          src={slide_image6}
          className="mt-8 mx-auto lg:max-w-[56rem] md:max-w-[26rem] rounded-lg sm:max-w-[12rem]"
        />
      </section>

      <section className="mt-36">
        <TagLine text={`AI Powered`} width={"w-[9rem]"} />
        <Title className="" spanText={"Features"} text={""} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-15">
          {features.map((feature) => (
            <FeatureCard
              id={`feature-${feature.id}`}
              key={feature.id}
              title={feature.title}
              description={feature.description}
              onClick={() => handleFeatureClick(feature.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
