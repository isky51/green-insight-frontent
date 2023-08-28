import Highcharts from "highcharts";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HCAccessibility from "highcharts/modules/accessibility";

HCExporting(Highcharts);
HCExportData(Highcharts);
HCAccessibility(Highcharts);

export function pieChart(props: any) {

    const optionPieChart = {
        credits: {
            enabled: false
        },
        title: {
            style: {
                fontWeight: 'bold',
                color: '#285254'
            },
            text: `<div style="color:;font-size:20px">${props?.pieChartCount}</div><br><span>Projects</span>`,
            align: 'center',
            verticalAlign: 'middle',

        },
        chart: {
            height: 230,
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        colors: ["#C1D3C0", "#D8856B", "#5F9A80"],
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },

            }
        },
        series: [{

            type: 'pie',
            name: 'Project Overview',
            innerSize: '70%',
            data: [
                ['', 0],
                ['', 0],
                ['', 99.90],

            ]
        }]
    }
    
    return props.chart === "piechart" ? optionPieChart : ""
}