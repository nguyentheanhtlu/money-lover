import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function PieChart(props) {
    const options = {
        legend: {
            show: false
        },
        chart: {
            width: 380,
            type: 'donut',
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        labels: props.data.map(item => {return item.subCate_name}),
        fill: {
            type: 'gradient',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    const series = props.data.map(item => {return Math.abs(item.sum)})

    return (
        <Chart options={options} series={series} type="donut" width={"100%"} height={300}/>
    )
}

