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
    "둘째" : 7,
    "셋째": 27,
  },
  {
    "tag": "together",
    "첫째" : 21,
    "둘째" : 2,
    "셋째": 14,
  },
  {
    "tag": "leg",
    "첫째" : 16,
    "둘째" : 10,
    "셋째": 3,
  },
  {
    "tag": "arm",
    "첫째" : 24,
    "둘째" : 28,
    "셋째": 23,
  },
  {
    "tag": "aerobic",
    "첫째" : 17,
    "둘째" : 22,
    "셋째": 13,
  },
  {
    "tag": "body",
    "첫째" : 11,
    "둘째" : 26,
    "셋째": 18,
  },
  {
    "tag": "senseOfBalance",
    "첫째" : 4,
    "둘째" : 30,
    "셋째": 8,
  },
  {
    "tag": "height",
    "첫째" : 25,
    "둘째" : 12,
    "셋째": 1,
  },
];
const children = ['첫째']

const MotionChart = (data) => (
    <ResponsiveRadar
        data={resData}
        keys={children}
        indexBy="tag"
        valueFormat=">-.2f"
        margin={{ top: 55, right: 80, bottom: 50, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'category10' }}
        fillOpacity={0.4}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MotionChart;