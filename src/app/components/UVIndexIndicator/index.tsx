type Props = {
  uv: number;
};
export const UvIndicator = ({ uv }: Props) => {
  const dangerLevel = uvDangerLevel.find(({ index }) => index >= uv);
  return (
    <div className="h-full flex flex-col">
      <span className="font-bold text-[18px]">{dangerLevel?.riskLevel}</span>
      <input
        type="range"
        min="1"
        max="11"
        value={uv}
        id="myRange"
        className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 my-[10px]"
        disabled
      />
    </div>
  );
};

const uvDangerLevel = [
  {
    index: 2,
    riskLevel: "Low",
    advise: "No protection needed. Safe to be outside.",
  },
  {
    index: 5,
    riskLevel: "Moderate",
    advise: "Protect your skin. Use sunscreen and wear a hat and sunglasses.",
  },
  {
    index: 7,
    riskLevel: "High",
    advise: "Avoid the sun around midday. Apply sunscreen regularly.",
  },
  {
    index: 10,
    riskLevel: "Very High",
    advise:
      "Take extra precautions. Limit time in the sun. Wear protective clothing.",
  },
  {
    index: 11,
    riskLevel: "Extreme",
    advise:
      "Maximum protection required. Avoid being outside during peak sun hours.",
  },
];
