
export default function bubbleChart(props: any) {
    console.log(props, "prop")
    let bubbleArr: any = []
    props?.map((x: any) =>
        bubbleArr.push({ color: x.color, name: x.name, x: x.x, y: x.y, z: Number(x.z), fillColor: x.color })
    )
    const bubbleOption: Highcharts.Options = {
        credits: {
            enabled: false
        },
        chart: {
            type: 'bubble',
            plotBorderWidth: 1
        },
        legend: { enabled: false },
        title: { text: '' },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'tCo2e'
            },
            labels: {
                enabled: false,

            },
            plotLines: [{
                color: 'transparent',
                // dashStyle: 'dot',
                width: 2,

                label: {
                    rotation: 0,
                    y: 25,
                    x: 10,
                    style: {
                        fontWeight: "bold",
                    },
                    text: 'Emissions <br /> Intensity <br /> gCo2/Ton-Mile'
                },
                zIndex: 3
            }],
            accessibility: {
                rangeDescription: ''
            }
        },

        yAxis: {
            min: Math.trunc((Math.min(...props?.map((i: any) => i?.y)) || 50) - 10),

            title: {
                text: 'gCO2e/Ton-Mile'
            },
            labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                    const valueAsNumber = Number(this.value); // Convert value to a number

                    if (valueAsNumber < 1000) {
                        return valueAsNumber + 'g'; // Return as string
                    } else if (valueAsNumber >= 1000) {
                        return valueAsNumber + "g"; // Return as string
                    }
                    return String(valueAsNumber); // Convert back to string
                }
            },
            plotLines: [{
                color: 'transparent',
                // dashStyle: 'dot',
                width: 2,
                value: 800,

                label: {
                    rotation: 0,
                    y: 180,
                    x: 870,
                    style: {
                        fontWeight: "bold",
                    },
                    text: 'Ton Miles of Fright'
                },
                zIndex: 3
            }, {
                // dashStyle: 'dot',
                color: '#215154',
                width: 2,
                value: 1500,
                zIndex: 10,
                label: {
                    text: 'Emissions <br />Intensity <br /> gCO2e ton-mile',
                    align: 'left',
                    x: 10,
                    y: -20,
                    useHTML: true,
                    style: {
                        fontSize: "14px",
                        color: '#215154'
                    }
                }
            }],

        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b><span class="text-capitalize">{point.name}:</span></b> {point.y:.1f}g</sub>'
        },
        plotOptions: {
            series: {
                marker: {
                    fillOpacity: 1,
                    // fillColor: '#FFFFFF',
                    lineWidth: 0,
                    lineColor: "" // inherit from series
                },
                dataLabels: {
                    inside: false,
                    enabled: true,
                    y: -15,
                    format: '<span class="text-capitalize">{point.name}</span>'
                }
            }
        },

        // { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
        // { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
        // { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },

        series: [{
            type: 'bubble',
            data: bubbleArr,
            // colorByPoint: true
        }]
    }
    return bubbleOption
}