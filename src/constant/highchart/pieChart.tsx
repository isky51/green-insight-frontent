import Highcharts from "highcharts";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HCAccessibility from "highcharts/modules/accessibility";

HCExporting(Highcharts);
HCExportData(Highcharts);
HCAccessibility(Highcharts);

export function pieChart(props: any) {
    let arrNew1 = []
    let emissionRegionYear = []
    let arrNew = []
    let regionMaxValue = ""
    let regionUnitValue = ""
    let emissionYear1 = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"]
    let arrNew2 :any= []
    let ProjectDetails1 = []

    props?.options?.length > 0 && props.options?.map((x:any, index:number) => {

        switch (x.name) {
            case "lables":
                emissionRegionYear.push(x.data)
                break;
            case "Max":
                regionMaxValue = x.data
                break;
            case "Unit":
                regionUnitValue = x.data
                break;
            default:
                arrNew.push({
                    name: x.name, data: x.data, color: "#215154", type: (x.name === "company_level") || (x.name === "target_level") ? "spline" : "column", dashStyle: (index === 11) || (index === 12) ? "dot" : "none", showInLegend: (x.name === "company_level") || (x.name === "target_level") || (x.name === "base_level") ? false : true, dataLabels: {
                        enabled: true,
                        inside: false,
                        y: -10,
                        align: 'center',
                        verticalAlign: "bottom",
                        formatter: function () {
                            return `<div align='center'  style='color:#215154;font-size:13px'>${this.y} </br></div>`
                        },
                        useHTML: true,
                        style: {
                            color: 'white',
                            textOutline: false,
                        }
                    }
                })
        }
        return true

    })

    if (props.chart === 1) {

        Object.entries(props.options ? props.options : {})?.map((x) => {

            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year") {
                arrNew2.push({
                    name: x[0] === "targer_level" ? "Target/Q" : "Company level", data: x[1], color: x[0] === "targer_level" ? "#427c90" : x[0] === "company_level" && "#285254", marker: {
                        symbol: 'circle',
                        radius: 10,
                    }, zoneAxis: 'x', zones: [{
                        value: 4 + (0.33 * (new Date().getMonth() + 1)),
                    }, {
                        dashStyle: props.options?.year?.[1] === new Date().getFullYear() ? "dot" : ""
                    }],
                    dataLabels: {
                        enabled: true,
                        y: -5,
                        x: -38,
                        color: "#215154",
                        crop: false,
                        overflow: 'none',
                        allowOverlap: false,
                        useHTML: true,
                        formatter: function (this:any) {
                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? "" : x[0] === "company_level" && "";
                            }
                        }
                    }
                })
            }
            // else if (x[0] === "year") {
            //     emissionReductionYear.push(x[1])
            // }
            return true;

        })
    }
    const options1 = {
        credits: {
            enabled: false
        },
        chart: {

            zoomType: 'xy',
        },
        title: {
            text: ''
        },
        legend: {
            enabled: true,
            itemMarginBottom: 5,
            floating: false,

            symbolWidth: 16,
            symbolRadius: 0,
            squareSymbol: true,

        },
        yAxis: {
            max: props.options?.max,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',
            labels: {
                formatter: function (this:any) {
                    return this.value.toLocaleString("en-US")
                }
            },
            plotLines: [{
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props.options?.base_level,

                label: {
                    y: -15,
                    x: 0,
                    align: 'left',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return `<div>COMPANY LEVEL BASELINE</div>`;

                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            }, {

                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: 1060000,

                label: {
                    y: -5,
                    x: 10,
                    text: 'Baseline',
                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: false,
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }

            }]
        },
        tooltip: {
            formatter: function (this:any) {
                return this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }

        },
        dataLabels: {
            enabled: false,
            rotation: 0,
            color: '#FFFFFF',
            align: 'center',
            crop: false,
            format: '{point.y:.2f}', // one decimal

        },

        xAxis: {
            min: -1,
            labels: {
                enabled: true,
                useHTML: true,
                formatter: function (this:any) {
                    if (this.pos === 1) {
                        return this.value + "<br/>" + `<div style='font-weight:bold;padding-top:12px;'>${props.options?.year[0]}</div>`;
                    }

                    else if (this.pos === 5) {
                        return this.value + "<br/>" + `<div style='font-weight:bold;padding-top:12px;'>${props.options?.year[1]}</div>`;
                    }

                    return this.value
                }

            },
            categories: emissionYear1,
            plotLines: [{

                color: "#285254",
                width: 1,
                enabled: false,
                value: props.options?.year?.[1] === new Date().getFullYear() ? 4 + (0.33 * (new Date().getMonth() + 1)) : 14.10,
                label: {
                    text: 'Now',
                    rotation: 0,
                    x: 5,
                    y: 20,
                    useHTML: true,
                    style: {
                        color: "#285254",
                        fontSize: "12px",
                    }

                }

            }]
        },


        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },

            }
        },

        series: arrNew2,

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },

            }]
        },


    }
    return props.chart==1?options1 : ""
}