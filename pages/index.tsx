import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

import theme from './theme';
import getMetrics from '../getMetrics';
import config from '../config';

const Index = (props: any) => (
  <div>
    {props.data.map((metric: MetricData) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <div>
          <p
            style={{
              fontSize: '20px',
              color: '#888',
              margin: 0,
              fontFamily: `'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif`,
            }}
          >
            {metric.title}
          </p>
          <span
            style={{
              fontSize: '60px',
              color: '#333',
              fontFamily: `'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif`,
            }}
          >
            {metric.datapoints[metric.datapoints.length - 1][metric.statistic]}
            {metric.suffix}
          </span>
        </div>
        <div style={{ width: '40rem', marginLeft: '20px' }}>
          <VictoryChart
            theme={theme}
            height={300}
            width={600}
            scale={{ x: 'time', y: 'linear' }}
          >
            <VictoryLine
              style={{
                data: { stroke: '#333', strokeWidth: 2 },
                parent: { border: '1px solid #ccc' },
              }}
              data={metric.datapoints.map((point: any) => ({
                x: point.Timestamp,
                y: point[metric.statistic],
              }))}
              interpolation="bundle"
            />
            <VictoryAxis
              crossAxis
              tickCount={5}
              style={{
                grid: { stroke: 'transparent' },
                axisLabel: { padding: 20 },
                tickLabels: { padding: 20 },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={t => `${t}${metric.suffix}`}
              style={{
                axisLabel: { padding: 20 },
                tickLabels: { padding: 20 },
                grid: { stroke: '#bbb' },
                axis: { stroke: 'transparent' },
              }}
            />
          </VictoryChart>
        </div>
      </div>
    ))}
  </div>
);

Index.getInitialProps = async function() {
  const data: MetricData[] = await getMetrics(config);
  return { data };
};

export default Index;
