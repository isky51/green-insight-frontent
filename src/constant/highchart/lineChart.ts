import Highcharts from "highcharts";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HCAccessibility from "highcharts/modules/accessibility";

// Import and initialize Highcharts modules
HCExporting(Highcharts);
HCExportData(Highcharts);
HCAccessibility(Highcharts);

// Define the array of quarters
export const emissionYear1 = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"];

export function lineChart(props: any) {
    const emissionsReduction: any = [];
    const option1Array: any = [];

    if (props.chart === "emissionReduction") {
        Object.entries(props.options ? props.options : {})?.map((x) => {
            console.log(x, "check x");
            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year" && x[0] !== "company_level") {
                emissionsReduction.push({
                    name: x[0] === "targer_level" ? props?.regionName + " Target/Q" : x[0] === "company_level" ? "Company level" : props?.regionName + " Region", data: x[1], color: x[0] === "targer_level" ? "#427c90" : x[0] === "company_level" ? "#325454" : "#285254", marker: {
                        symbol: 'circle',
                        radius: 10,
                    }, zoneAxis: 'x', threshold: 2, zones: [{
                        value: 4 + (0.33 * (new Date().getMonth() + 1)),
                    }, {
                        dashStyle: props.options?.year?.[1] === new Date().getFullYear() ? "dot" : ""
                    }],
                    dataLabels: {
                        enabled: true,
                        y: -4,
                        x: -30,
                        color: "#215154",
                        useHTML: true,
                        crop: false,
                        overflow: 'none',
                        allowOverlap: false,
                        formatter: function (this: any) {
                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? `` : x[0] === "company_level" ? "<div style='margin-top:0px;font-size:12px'>Company<br/>Level</div>" : ``;
                            }
                        }
                    }
                })
            }
            return true
        })
    } else if (props.chart === 1) {
        Object.entries(props.options ? props.options : {})?.map((x) => {
            if (x[0] !== "base_level" && x[0] !== "max" && x[0] !== "year") {
                option1Array.push({
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
                        formatter: function (this: any) {
                            if (this.point === this.series.data[0]) {
                                return x[0] === "targer_level" ? "" : x[0] === "company_level" && "";
                            }
                        }
                    }
                })
            }
            return true;
        })
    }

    const optionRegional = {
        credits: {
            enabled: false
        },
        chart: {
            zoomType: 'xy',
        },
        title: {
            text: ''
        },
        yAxis: {
            max: props?.options?.max,
            min: 0,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',
            labels: {
                formatter: function (this: any) {
                    return this.value?.toLocaleString("en-US", { minimumFractionDigits: 1 })
                }
            },
            plotLines: [{
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props?.options?.base_level?.[0],
                enabled: false,
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
                value: props?.options?.base_level?.[0],
                label: {
                    y: -10,
                    x: -10,
                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return '<div></div>';
                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            {
                dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: props?.maxRegionsValue,

                label: {
                    y: -10,
                    x: 0,
                    align: 'right',
                    paddingBottom: 10,
                    verticalAlign: "top",
                    color: '#215154',
                    useHTML: true,
                    formatter: function () {
                        return `<div>${props?.regionName ? props?.regionName : "Pacific"} Region</div><br/>`;
                    },
                    style: {
                        color: '#215154',
                        fontSize: "12px",
                    }
                }
            },
            ]
        },
        tooltip: {
            formatter: function (this: any) {
                return `<b>${this.key} </br>` + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })
            }
        },
        dataLabels: {
            enabled: false,
            rotation: 0,
            color: '#FFFFFF',
            align: 'center',
            crop: false,
            format: '{point.y:.2f}',
        },
        xAxis: {
            min: -1,
            labels: {
                enabled: true,
                useHTML: true,
                formatter: function (this: any) {
                    if (this.pos === 1) {
                        return `${this.value} <br/> <div style='font-weight:bold;padding-top:12px;'>${props?.options?.year[0]}</div>`;
                    }
                    else if (this.pos === 5) {
                        return `${this.value} <br/> <div style='font-weight:bold;padding-top:12px;'>${props?.options?.year[1]}</div>`;
                    }
                    return this.value
                }
            },
            categories: emissionYear1,
            plotLines: [{
                color: "#285254",
                width: 1,
                value: props?.year?.[1] === new Date().getFullYear() ? 4 + (0.33 * (new Date().getMonth() + 1)) : 14.10,
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
        series: emissionsReduction,
        responsive: {
            rules: [{
                condition: {
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        },
    };

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
                formatter: function (this: any) {
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
            formatter: function (this: any) {
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
                formatter: function (this: any) {
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
        series: option1Array,
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
            }]
        },
    }
    return props.chart === "emissionReduction" ? optionRegional :props.chart === 1 ? options1 : ""
}