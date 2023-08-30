import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
highchartsMore(Highcharts);
interface ChartProps {
  options: any;
}
const ChartHighChart: React.FC<ChartProps> = ({ options }) => {
  return <HighchartsReact highcharts={Highcharts} options={{...options, exporting: {
    buttons: {
        contextButton: {
            enabled: false // Disable the context menu button
        }
    }
}}}   />;
};
export default ChartHighChart;


