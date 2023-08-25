import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
interface ChartProps {
  options: any;
}
const ChartHighChart: React.FC<ChartProps> = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
export default ChartHighChart;
