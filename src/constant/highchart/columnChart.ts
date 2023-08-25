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

