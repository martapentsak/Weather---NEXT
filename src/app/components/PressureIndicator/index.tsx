import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const minPressure = 975;
const maxPressure = 1065;

type Props = {
  pressure: number;
};
export const PressureIndicator = ({ pressure }: Props) => {
  const percent =
    ((pressure - minPressure) / (maxPressure - minPressure)) * 100;
  return (
    <div className="h-[90%]">
      <Gauge
        value={percent}
        startAngle={-110}
        endAngle={110}
        min={minPressure}
        max={maxPressure}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 25,
            color: "white",
            transform: "translate(0px, 0px)",
          },
        }}
        text={() => `${pressure} hPa`}
      />
    </div>
  );
};
