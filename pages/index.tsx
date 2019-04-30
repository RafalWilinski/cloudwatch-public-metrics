import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

import theme from "./theme";
import "./styles/index.css";
import getMetrics from "../getMetrics";
import config from "../config";

const Index = (props: any) => (
  <div className="homePage">
    {props.data.map((metric: MetricData) => (
      <div>
        <h2>{metric.title}</h2>
        <h3>
          {metric.datapoints[metric.datapoints.length - 1][metric.statistic]}
          {metric.suffix}
        </h3>
        <VictoryChart theme={theme} scale={{ x: "time", y: "linear" }}>
          <VictoryLine
            style={{
              data: { stroke: "#333", strokeWidth: 2 },
              parent: { border: "1px solid #ccc" }
            }}
            data={metric.datapoints.map((point: any) => ({
              x: point.Timestamp,
              y: point[metric.statistic]
            }))}
            interpolation="bundle"
          />
          <VictoryAxis crossAxis tickCount={5} />
          <VictoryAxis
            dependentAxis
            tickFormat={t => `${t}${metric.suffix}`}
            style={{
              grid: { stroke: "#bbb" },
              axis: { stroke: "transparent" }
            }}
          />
        </VictoryChart>
      </div>
    ))}
  </div>
);

Index.getInitialProps = async function() {
  const data: MetricData[] = await getMetrics(config);
  return { data };
};

export default Index;
