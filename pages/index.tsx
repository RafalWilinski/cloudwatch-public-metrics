import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

import theme from "./theme";
import "./styles/index.css";

import getMetrics from "../getMetrics";
import config from "../config";

const Index = (props: any) => {
  console.log(props);

  return (
    <div className="homePage">
      <div>Welcome to next.js serverless ⚡</div>

      <VictoryChart theme={theme} scale={{ x: "time", y: "linear" }}>
        {/* <VictoryLine
          style={{
            data: { stroke: "#333", strokeWidth: 2 },
            parent: { border: "1px solid #ccc" }
          }}
          data={props.data.datapoints.map((point: any) => ({
            x: point.Timestamp,
            y: point[statistic]
          }))}
          interpolation="bundle"
        /> */}
        <VictoryAxis crossAxis tickCount={5} />
        {/* <VictoryAxis
          dependentAxis
          tickFormat={t => `${t}${suffix}`}
          style={{
            grid: { stroke: "#bbb" },
            axis: { stroke: "transparent" }
          }}
        /> */}
      </VictoryChart>
    </div>
  );
};

Index.getInitialProps = async function() {
  const data: MetricData[] = await getMetrics(config);
  return { data };
};

export default Index;
