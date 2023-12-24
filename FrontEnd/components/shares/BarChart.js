import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function MyBarChart(props) {

    const ranges = props.for === 'all' ? [{
        from: 0,
        to: Infinity,
        color: 'dodgerblue'
    }, {
        from: -Infinity,
        to: 0,
        color: '#F15B46'
    }] : [{
        from: 0,
        to: Infinity,
        color: props.data[0] > 0 ? 'dodgerblue' : '#F15B46'
    }]

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: ranges
                },
                columnWidth: '80%',
            }
        },
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            title: {
                text: 'Growth',
            },
            labels: {
                formatter: function (y) {
                    return y.toFixed(0);
                }
            }
        },
        xaxis: {
            categories: props.categories,
            labels: {
                rotate: -90
            }
        }
    }

    const series = [{
        name: 'Finance Flow',
        data: props.for === 'all' ? props.data : props.data.map(item => {return Math.abs(item)})
    }]

    return (
        <>
            <Chart options={options} series={series} type="bar" width={"100%"} height={350} />
        </>
    )
}