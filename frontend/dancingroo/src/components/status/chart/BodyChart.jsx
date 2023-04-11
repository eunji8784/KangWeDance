import { ResponsiveLine } from '@nivo/line'

  const BodyChart = ({ data, color }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '최근 7개월간 변화',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        curve="cardinal"
        axisLeft={null}
        colors={{ scheme: color }}
        enableGridY={false}
        enablePointLabel={true}
        pointSize={4}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={4}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}

    />
)

export default BodyChart;