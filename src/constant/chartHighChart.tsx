import React from "react";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import Boost from "highcharts/modules/boost";
// import highcharts3d from "highcharts/highcharts-3d";
// import borderRadius from "highcharts-border-radius";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

// Boost(Highcharts);
// highcharts3d(Highcharts);
// borderRadius(Highcharts);

interface ChartProps {
  tooltip: any;
  series: any;
  accessibility: any;
  plotOptions: any;
  chart: any;
  title: any;
  credits: any;
  colors: any;
}

const ChartHighChart: React.FC<ChartProps> = ({
  tooltip,
  series,
  accessibility,
  plotOptions,
  chart,
  title,
  credits,
  colors,
}) => {
  const options: Highcharts.Options = {
    [credits ? "credits" : ""]: credits,
    [title ? "title" : ""]: title,
    [chart ? "chart" : ""]: chart,
    [tooltip ? "tooltip" : ""]: tooltip,
    [accessibility ? "accessibility" : ""]: accessibility,
    [colors ? "colors" : ""]: colors,
    [plotOptions ? "plotOptions" : ""]: plotOptions,
    [series ? "series" : ""]: series,
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
export default ChartHighChart;
