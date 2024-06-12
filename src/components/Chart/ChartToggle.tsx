import { LuCandlestickChart, LuLineChart } from "react-icons/lu";
import { ChartType } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export const ChartToggle = ({
  selectedChart,
  setSelectedChart,
}: {
  selectedChart: ChartType;
  setSelectedChart: (value: ChartType) => void;
}) => {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={selectedChart}
      onValueChange={(value: ChartType) => {
        setSelectedChart(value);
      }}
    >
      <ToggleGroupItem value="baseline" aria-label="baseline chart">
        <LuLineChart />
      </ToggleGroupItem>
      <ToggleGroupItem value="candlestick" aria-label="candlestick chart">
        <LuCandlestickChart />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
