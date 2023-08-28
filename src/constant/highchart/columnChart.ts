export function columnChart(props: any) {

    const optionRegion = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'column',
            inverted: true,
            height: props?.regionPageArr?.length * 30,
        },
        xAxis: {
            categories: props.regionPageArr?.map((i:any) => `${i?.name} (${i?.y > 0 ? `+ ${i?.y}` : `- ${Math.abs(i?.yValue)}`})`)

        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },

        },
        yAxis: {
            gridLineColor: 'transparent',
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 0.5,
                color: 'black',
                zIndex: 10
            }],
        },

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,

            formatter(this:any) {
                return this.y > 0 ? `<b>${this.key} </br> ${this.y} ${props?.unitDto || 'g'}</b>` : `<b>${this.key} </br> ${Math.abs(this.series.options?.data[this.point?.index]?.yValue)} ${props?.unitDto || 'g'}</b>`
            }
        },
        series: [{
            name: '',
            pointWidth: 15,
            data: props.regionPageArr ? props.regionPageArr : [['Shanghai', 24]],
        }]
    }

    const optionLane = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'bar',
            marginLeft: 90,
            marginRight: 90,
            height: props?.lanePageArr?.length > 3 ? props?.lanePageArr?.length * 30 : props?.lanePageArr?.length * 70,
        },
        plotOptions: {
            bar: {
            },
            series: {
                dataLabels: {
                    enabled: false,
                    inside: false
                }
            }
        },
        colors: [
            '#4572A7',
            '#AA4643',
            '#89A54E',
            '#80699B',
            '#3D96AE',
            '#DB843D',
            '#92A8CD',
            '#A47D7C',
            '#B5CA92'
        ],

        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [

            {
                tickPositions: props.lanePagecontributor,

                color: "#215154",

                labels: {
                    align: "left",
                    x: 40,
                    enabled: false,
                    verticalAlign: 'left',
                    formatter(this:any) {
                        return this?.chart?.userOptions?.series?.[0]?.data[this.value].y > 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value].name : ``
                    }
                },

            }, {

                tickPositions: props.lanePagedetractor,
                linkedTo: 0,
                labels: {

                    enabled: false,
                    align: "left",
                    x: -120,
                    verticalAlign: 'right',
                    formatter(this:any) {
                        return this?.chart?.userOptions?.series?.[0]?.data[this.value]?.y < 0 ? this?.chart?.userOptions?.series?.[0]?.data[this.value]?.name : ``
                    }
                },
                opposite: true
            }],

        yAxis: [{
            tickPositioner: function (this:any) {
                let maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
                let halfMaxDeviation = Math.ceil(maxDeviation / 2);

                return [-maxDeviation - 1, -halfMaxDeviation - 1, 0, halfMaxDeviation + 4, maxDeviation + 4];
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,

            plotLines: [{
                value: 0,
                width: 0.5,
                color: 'black',
                zIndex: 10
            }],
            title: {
                text: ''
            }
        }],
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            formatter(this:any) {
                return this.y > 0 ? `<b ><span class='text-capitalize'>${this.key} </span> </br> ${this.y?.toFixed(1).toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>` : `<b > <span class='text-capitalize'>${this.key} </span> </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y.round(1))?.toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>`
            }
        },
        series: [{

            name: '',
            data: props.lanePageArr ? props.lanePageArr : [['Shanghai', 24]], pointWidth: 17
            ,
            dataLabels: {
                enabled: false,
                rotation: 0,
                color: '#FFFFFF',
                align: 'center',
                crop: false,
                formatter(this:any) {
                    return this.y > 0 ? this.y?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + " g" : Math.abs(this.y)?.toLocaleString("en-US", { minimumFractionDigits: 1 }) + " g"
                }

            }
        }]
    }


   
    return props.chart==="region" ? optionRegion : props.chart === "lane" ? optionLane : ""
}

export const carrierOverViewColumnGraph = (props: any) => {
    console.log(props, "check prop")
    let arrNew1: any = []
    props?.options.map((x: any, index: number) => {
        arrNew1.push({
            events: {
                legendItemClick: function () {
                    return false;
                },
            },
            name: x.year,
            data: [Number(x.intensity)],
            color: index === 0 ? "#C1D3C0" : "#215154",
            pointWidth: 50,
        });
        return true;
    });
    const optionCarrierOverview = {
        credits: {
            enabled: false,
        },
        title: {
            text: "",
        },
        chart: {
            type: "column",
        },
        legend: {
            symbolPadding: 0,
            symbolWidth: 0,
            symbolHeight: 0,
            squareSymbol: false,
            useHTML: true,
            margin: 0,
            padding: 0,
            x: 30,
            itemMarginTop: 10,
            labelFormatter: function (this: any) {
                let textData =
                    "<div class='pointer-cursor' align:'center'  style='color:#215154' class='text-center text-capitalize'><div>All Carriers</div><br></div>";
                return this.index === 1
                    ? "<div class='pointer-cursor' align:'center' style='padding-left: 4.5em;color:#215154' class='text-center text-capitalize' ><div>" +
                    props?.carrier_name +
                    "</div><br></div>"
                    : textData;
            },
        },
        yAxis: {
            max: props.options?.[0]?.graphMax,
            title: {
                text: "",
            },
            enabled: false,
            gridLineColor: "transparent",
            plotLines: [
                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: 30,
                    label: {
                        text: "Baseline",
                        align: "left",
                        x: 0,
                        y: 10,
                        useHTML: true,
                        style: {
                            color: "#215154",
                            fontSize: "12px",
                        },
                    },
                },
                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: props?.industrialAverage,
                    zIndex: 10,

                    label: {
                        text: "Industry average",
                        align: "left",
                        x: 0,
                        y:
                            Math.round(
                                ((props?.max - props?.industrialAverage) / props?.max) * 100
                            ) > 0
                                ? 20
                                : -10,
                        useHTML: true,
                        style: {
                            fontSize: "12px",
                            color: "#215154",
                        },
                    },
                },
            ],
        },
        xAxis: {
            categories: [""],
            crosshair: true,
        },

        tooltip: {
            enabled: false,

            formatter(this: any) {
                return this.y > 0
                    ? `<b>${this.key} </br> ${this.y?.toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                    })} g</b>`
                    : `<b>${this.key} </br> ${Math.abs(
                        this.series.options?.data[this.point?.index]?.y
                    )?.toLocaleString("en-US", { minimumFractionDigits: 1 })} g</b>`;
            },
        },

        plotOptions: {
            series: {
                borderRadiusTopLeft: "20%",
                borderRadiusTopRight: "20%",
                dataLabels: {
                    enabled: true,
                    inside: false,
                    y: -10,
                    align: "center",
                    verticalAlign: "bottom",
                    formatter: function (this: any) {
                        return this.color === "#C1D3C0"
                            ? "<div align='center' class='text-center' style='color:#215154; font-size:13px'}>" +
                            this.y +
                            "</br></div></div>"
                            : "<div align='center' class='text-center'  style='color:#215154;font-size:13px'}>" +
                            this.y +
                            "</br></div></div>";
                    },
                    useHTML: true,
                    style: {
                        color: "white",
                        textOutline: false,
                    },
                },
            },
        },
        series: arrNew1,
    };
    return optionCarrierOverview
}


export const stackedMultiColumnGraph = (props: any) => {
    const stackedMultiGraph = {
        title: {
            text: "",
        },
        chart: {
            type: "column",
        },
        yAxis: {
            max: 125,
            stackLabels: {
                enabled: false,
            },
            min: 0,
            title: {
                text: "",
            },
            enabled: false,
            gridLineColor: "transparent",
            plotLines: [
                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: 90,
                    label: {
                        text: "Best in class",
                        align: "left",
                        x: 0,
                        y: -10,
                        useHTML: true,
                        style: {
                            color: "#215154",
                            fontSize: "12px",
                        },
                    },
                },
                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: 90,
                    label: {
                        text: "6%",
                        align: "right",
                        x: 0,
                        y: 15,
                        useHTML: true,
                        style: {
                            color: "#215154",
                            fontSize: "12px",
                        },
                    },
                },

                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: 60,
                    zIndex: 10,

                    label: {
                        text: "Average",
                        align: "left",
                        x: 0,
                        y: Math.round(((90 - 85) / props?.max) * 100) > 0 ? 20 : -10,
                        useHTML: true,
                        style: {
                            fontSize: "12px",
                            color: "#215154",
                        },
                    },
                },
                {
                    dashStyle: "dot",
                    color: "#215154",
                    width: 2,
                    value: 60,
                    zIndex: 10,

                    label: {
                        text: "2.8%",
                        align: "right",
                        x: 0,
                        y: 15,
                        useHTML: true,
                        style: {
                            fontSize: "12px",
                            color: "#215154",
                        },
                    },
                },
            ],
        },
        xAxis: {
            categories: ["Dart Transit Co."],

            labels: {
                enabled: true,
                useHTML: true,
                color: "#285254",
            },
        },
        tooltip: {
            enabled: false,
        },

        legend: {
            enabled: false,
        },

        plotOptions: {
            column: {
                stacking: "normal",
                dataLabels: {
                    enabled: true,
                },
            },
            series: {
                pointWidth: 100,
                dataLabels: {
                    inside: true,
                    align: "center",
                    verticalAlign: "bottom",
                    formatter: function (this: any) {
                        return `<div align='center' class='text-center' style='color:#fff; font-size:15px'}>${this.series?.options?.name}</div></div>`;
                    },
                    useHTML: true,
                },
            },
        },
        series: props.options,
    };
    return stackedMultiGraph
}