import { Box } from "@mui/material";
import Slider from "@mui/material/Slider";

type Props = {
  uv: number;
};
export const UvIndicator = ({ uv }: Props) => {
  return (
    <Box className="h-full flex flex-col">
      <span className="font-bold text-[14px]">{getUvRiskLevel(uv)}</span>
      <Slider
        size="small"
        min={0}
        max={12}
        defaultValue={uv}
        aria-label="Small"
        disabled
        sx={{
          "& .MuiSlider-track": {
            background:
              "linear-gradient(to right, red, yellow, green, blue, purple)",
            border: "none",
          },
          "& .MuiSlider-rail": {
            background:
              "linear-gradient(to right, red, yellow, green, blue, purple)",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};

function getUvRiskLevel(value: number): string {
  if (value < 0) return "Unknown";

  if (value <= 2) return "Low";
  if (value <= 5) return "Moderate";
  if (value <= 7) return "High";
  if (value <= 10) return "Very High";
  return "Extreme";
}
