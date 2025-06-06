"use client";
import Lottie from "lottie-react";
import weatherAnimation from "../../../animation/loading.json";

export default function Loading() {
  return (
    <div className="bg-[#367aae] min-h-screen w-screen flex items-center justify-center">
      <Lottie
        animationData={weatherAnimation}
        loop={true}
        autoplay={true}
        style={{ height: 600, width: 600 }}
      />
    </div>
  );
}
