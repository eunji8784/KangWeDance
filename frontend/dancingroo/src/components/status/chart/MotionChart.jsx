import { ResponsiveRadar } from '@nivo/radar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const resData = [
  {
    "tag": "flexibility",
    "첫째" : 9,
  },
  {
    "tag": "together",
    "첫째" : 21,
  },
  {
    "tag": "leg",
    "첫째" : 16,
  },
  {
    "tag": "arm",
    "첫째" : 24,
  },
  {
    "tag": "aerobic",
    "첫째" : 17,
  },
  {
    "tag": "body",
    "첫째" : 11,
  },
  {
    "tag": "senseOfBalance",
    "첫째" : 4,
  },
];
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
        // legends={[
        //     {
        //         anchor: 'top-left',
        //         direction: 'column',
        //         translateX: -50,
        //         translateY: -40,
        //         itemWidth: 80,
        //         itemHeight: 20,
        //         itemTextColor: '#999',
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
)

export default MotionChart;