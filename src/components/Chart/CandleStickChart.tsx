import { ChartContainer } from "./ChartContainer";
import { CandleStickChartItem } from "@/lib/types";

export const CandleStickChart = ({
  data,
  additionalData,
}: {
  data: Array<CandleStickChartItem>;
  additionalData?: Array<CandleStickChartItem>;
}) => {
  return (
    <ChartContainer<CandleStickChartItem>
      data={data}
      additionalData={additionalData}
      chartOptions={{
        addSeries: (chart) =>
          chart.addCandlestickSeries({
            upColor: "#14c684",
            downColor: "#eb3843",
            borderVisible: false,
            wickUpColor: "#14c684",
            wickDownColor: "#eb3843",
          }),
        barSpacing: 20,
        updateSeries: (series, data) => series.update(data),
      }}
    />
  );
};
