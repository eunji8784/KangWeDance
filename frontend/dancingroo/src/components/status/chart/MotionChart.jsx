import { ResponsiveRadar } from '@nivo/radar'

const children = ['누적횟수']

const MotionChart = ({data}) => (
    <ResponsiveRadar
        data={data}
        keys={children}
        indexBy="tag"
        valueFormat=">-.2f"
        margin={{ top: 55, right: 80, bottom: 50, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        enableDotLabel={true}
        dotSize={4}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={4}
        colors={{ scheme: 'category10' }}
        fillOpacity={0.4}
        blendMode="multiply"
        motionConfig="wobbly"
    />
)

export default MotionChart;