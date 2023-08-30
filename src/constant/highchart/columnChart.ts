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
                lineWidth: 0, 
                tickLength: 0, 
                labels: {
                    enabled: false
                  }
            }
        ],
        yAxis: [{
            tickPositioner: function (this:any) {
                let maxDeviation = Math.ceil(Math.max(Math.abs(this.dataMax), Math.abs(this.dataMin)));
                let halfMaxDeviation = Math.ceil(maxDeviation / 2);
                return [-maxDeviation - 1, -halfMaxDeviation - 1, 0, halfMaxDeviation + 4, maxDeviation + 4];
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            labels: {
                enabled: false
              },
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
                return this.y > 0 ? `<b ><span class='text-capitalize'>${this.key} </span> </br> ${this.y?.toFixed(1).toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>` : `<b > <span class='text-capitalize'>${this.key} </span> </br> ${Math.abs(this.series.options?.data[this.point?.index]?.y.toFixed(1))?.toLocaleString("en-US", { minimumFractionDigits: 1 })} ${props?.unitDto || 'g'}</b>`
            }
        },
        series: [{
            name: '',
            data: props.lanePageArr ? props.lanePageArr : [['Shanghai', 24]], pointWidth: 17,
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

