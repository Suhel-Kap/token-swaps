import { ChartContainer } from "./ChartContainer";
import { LineChartItem } from "@/lib/types";

export const BaseLineChart = ({
  data,
  additionalData,
}: {
  data: Array<LineChartItem>;
  additionalData?: Array<LineChartItem>;
}) => {
  return (
    <ChartContainer<LineChartItem>
      data={data}
      additionalData={additionalData}
      chartOptions={{
        addSeries: (chart) =>
          chart.addBaselineSeries({
            topLineColor: "#14c684",
            topFillColor1: "rgba( 38, 166, 154, 0.28)",
            topFillColor2: "rgba( 38, 166, 154, 0.05)",
            bottomLineColor: "#eb3843",
            bottomFillColor1: "rgba( 239, 83, 80, 0.05)",
            bottomFillColor2: "rgba( 239, 83, 80, 0.28)",
          }),
        barSpacing: 10,
        updateSeries: (series, data) => series.update(data),
      }}
    />
  );
};
