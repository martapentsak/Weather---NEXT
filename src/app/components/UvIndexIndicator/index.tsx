type Props = {
  uv: number;
};
export const UvIndicator = ({ uv }: Props) => {
  const dangerLevel = uvDangerLevel.find(({ index }) => index >= uv)!;
  return (
    <div className="h-full flex flex-col">
      <span className="font-bold text-[18px]">{dangerLevel.riskLevel}</span>
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
  },
  {
    index: 5,
    riskLevel: "Moderate",
  },
  {
    index: 7,
    riskLevel: "High",
  },
  {
    index: 10,
    riskLevel: "Very High",
  },
  {
    index: 11,
    riskLevel: "Extreme",
  },
];
