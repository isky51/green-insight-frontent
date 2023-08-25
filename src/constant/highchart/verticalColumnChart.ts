import Highcharts from "highcharts";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HCAccessibility from "highcharts/modules/accessibility";

HCExporting(Highcharts);
HCExportData(Highcharts);
HCAccessibility(Highcharts);

export function verticalColumnChart(props: any) {
    let arrNew1:any = []
    let emissionRegionYear:any = []
    let arrNew:any = []
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

    if (props.chart === 2) {
        props?.options?.[0]?.dataset?.length > 0 && props.options?.[0]?.dataset.map((x:any, index:number) => {
            arrNew1.push({
                events: {
                    legendItemClick: function () {
                        return false;
                    }
                },
                name: x.year, data: [Number(x.intensity)], color: index === 0 ? "#C1D3C0" : "#215154", pointWidth: 50
            })

        })
    }
    
    const options2 = {
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        chart: {
            type: 'column',
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 20,
            itemMarginTop: 10,
            labelFormatter: function (this:any) {
                // color: rgb(204, 204, 204); cursor: pointer; font-size: 12px; font-weight: bold; fill: rgb(204, 204, 204);

                let textData = "<div  class='pointer-cursor' align:'center'  style='color:#215154' class='text-center'><div>Last Year</div><br>( " + this.name + " )</div>"
                return this.index === 1 ? "<div  class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center'><div>This Year</div><br>( " + this.name + " )</div>" : textData;
            }

        },
        yAxis: {
            max: props.options?.[0]?.graphMax,
            title: {
                text: ''
            },
            enabled: false,
            gridLineColor: 'transparent',

            plotLines: [
                
                {
                    dashStyle: 'dot',
                    color: '#D8856B',
                    width: 2,
                    value: props?.options?.[0]?.max,

                    label: {
                        y: Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? -20 : 20,
                        text: `${Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? '+' : ''} ${Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100)}` + "%",
                        x: -70,

                        align: 'right',
                        paddingBottom: 10,
                        verticalAlign: "bottom",
                        color: '#D8856B',
                        useHTML: true,
                        style: {
                            color: '#D8856B',
                            fontSize: "20px",
                        }
                    }
                }, {
                    // dashStyle: 'dot',
                    color: '#215154',
                    width: 2,
                    value: props?.options?.[0]?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: 'Industry average',
                        align: 'left',
                        x: 0,
                        y: Math.round(((props?.options?.[0]?.max - props?.options?.[0]?.industrialAverage) / props?.options?.[0]?.max) * 100) > 0 ? 20 : -20,
                        useHTML: true,
                        style: {

                            fontSize: "12px",
                            color: '#215154'
                        }
                    }
                }]
        },
        xAxis: {
            categories: [""
            ],
            crosshair: true
        },
        tooltip: {
            enabled: false,
        },

        plotOptions: {

            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",

                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function (this:any) {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y + "</br></div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y + "</br></div></div>"
                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                }
            }
        },
        series: arrNew1
    }

    const option4 = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            zoomType: 'xy',
        },

        title: {
            text: ''
        },
        // accessibility: {
        //     announceNewData: {
        //         enabled: true
        //     }
        // },
        xAxis: {
            labels: {
                color: "#285254",
            },
            categories: emissionRegionYear[0],
        },

        yAxis: [{

            max: regionMaxValue,

            plotLines: [{
                dashStyle: 'dot',
                color: '#5F9A80',
                width: 2,
                value: props.options?.[13]?.data,
                label: {

                    align: 'left',
                    x: 0,
                    y: -15,

                    useHTML: true,
                    formatter: function () {

                        return "<div align='center'  style='color:#215154;font-size:12px'> Company Level </br> <div style='color:#215154;font-size:12px'>BaseLine</br></div></div><div style='color:#215154;font-size:12px; padding-top:0.3025rem'>Company level</div></div>"
                    },
                    style: {
                        color: '#5F9A80',
                        fontSize: "12px",
                    }

                }

            }],
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: "#212121"
                },
                formatter: function (this:any) {

                    return this.value + " " + regionUnitValue


                }
            }
        }, {
            labels: {
                format: '{value} ' + regionUnitValue,

                style: {
                    color: "#FFF"
                }
            },
            title: {
                text: '',
                style: {
                    color: "#212121"
                }
            }
        }],
        tooltip: {
            // formatter: function () {
            //     return this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + ""
            // }
            enabled: false,

            // useHTML: true,
            formatter: function (this:any) {
                return `${this.x}<br/> ${arrNew[0].name}: ${this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 })} `;
            },
        },
        legend: {
            enabled: false,

            itemMarginBottom: 5,
            floating: false,

            symbolWidth: 16,
            symbolRadius: 0,
            squareSymbol: true,

        },

        plotOptions: {
            column: {
                stacking: 'normal'
            },
            enableMouseTracking: true,
            dataLabels: {
                enabled: true
            },
            tooltip: {
                enabled: false,
            },
            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",
                pointWidth: 40,
                tooltip: {
                    enabled: true,
                    style: {
                        zIndex: 99999
                    },
                    useHTML: true,
                    formatter: function () {
                        return '{series.name}: {point.y}<br/>Total: {point.stackTotal} ' + regionUnitValue;
                    },

                },
                dataLabels: {
                    enabled: true,
                    inside: true,
                    y: -10,
                    align: 'center',
                    verticalAlign: "bottom",
                    formatter: function (this:any) {

                        return this.color === "#C1D3C0" ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>" : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" + this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + "</br></div><div class='text-center' style='color:#215154;'>" + props?.unitValue + "</div></div>"

                    },
                    useHTML: true,
                    style: {
                        color: 'white',
                        textOutline: false,
                    }
                },

            }

        },
        colors: [


        ],


        series: arrNew,
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right'
                }
            },

        }

    }

    const option3 = {
        credits: {
            enabled: false
        },
        title: {
            style: {
                fontWeight: "bold",
                fontSize: '25px'
            },
            text: `<div className="h-1">${props?.pieChartCount}</div><br>Projects`,
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
                ['', 100],

            ]
        }]
    }
    let option ={};
    if(props.chart==2){
        option = options2;
    }
    if(props.chart==4){
        option = option4;
    }
    if(props.chart==3){
        option=option3;
    }
    return option
}