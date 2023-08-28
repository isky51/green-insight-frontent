export function columnChart(props: any, regionPageArr: any) {
    console.log(props, "check prop")
    const option = {
        credits: {
            enabled: false,
        },
        chart: {
            type: "column",
            inverted: true,
            height: regionPageArr?.length * 30,
        },
        xAxis: {
            categories: regionPageArr?.map(
                (i: any) =>
                    `${i?.name} (${i?.y > 0 ? `+ ${i?.y}` : `- ${Math.abs(i?.yValue)}`
                    })`
            ),
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        yAxis: {
            gridLineColor: "transparent",
            title: {
                text: "",
            },
            plotLines: [
                {
                    value: 0,
                    width: 0.5,
                    color: "black",
                    zIndex: 10,
                },
            ],
        },
        title: {
            text: "",
        },
        subtitle: {
            text: "",
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            formatter: function (this: any) {
                return this.y > 0
                    ? `<b>${this.key} </br> ${this.y} ${props?.unitDto || "g"}</b>`
                    : `<b>${this.key} </br> ${Math.abs(
                        this.series.options?.data[this.point?.index]?.yValue
                    )} ${props?.unitDto || "g"}</b>`;
            },
        },
        series: [
            {
                name: "",
                pointWidth: 15,
                data: regionPageArr ? regionPageArr : [["Shanghai", 24]],
            },
        ],
    };
    return option
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