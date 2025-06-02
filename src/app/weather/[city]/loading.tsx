"use client";
import Lottie from "lottie-react";
import weatherAnimation from "../../../../public/animation/loading.json";

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: weatherAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <Lottie
        animationData={weatherAnimation}
        loop={true}
        autoplay={true}
        style={{ height: 600, width: 600 }}
      />
    </div>
  );
}
