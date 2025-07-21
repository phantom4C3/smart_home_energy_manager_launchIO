"use client";
import { Suspense } from "react";
import { Title } from "@/components/ui/Heading";
import FeatureContent from "@/components/FeatureContent";

export default function FeaturesPage() {
  return (
    <div className="space-y-8">
      <Title className="" spanText={"Features"} text={""} />
      <Suspense fallback={<p>Loading feature...</p>}>
        <FeatureContent />
      </Suspense>
    </div>
  );
}
