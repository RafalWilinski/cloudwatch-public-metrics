import React from "react";
import styled from "styled-components";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import theme from "./theme";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: fixed;
  width: 100%;
  height: 25%;
  padding: 20px;
`;

const ChartContainer = styled.div`
  width: 40rem;
`;

const Text = styled.span`
  font-family: "Gill Sans", "Gill Sans MT", "Ser­avek", "Trebuchet MS",
    sans-serif;
  font-weight: 400;
  display: block;
`;

const MetricName = styled(Text)`
  font-size: 20px;
  color: #888;
`;

const MetricValue = styled(Text)`
  font-size: 60px;
  color: #333;
`;

// todo: małe jasne labelki
// brak osi pionowej
export default ({ title, statistic, data, suffix }) => (
  <AppContainer>
    <div>
      <MetricName>{title}</MetricName>
      <MetricValue>
        {data[data.length - 1][statistic]}
        {suffix}
      </MetricValue>
    </div>
    <ChartContainer>
      <VictoryChart theme={theme} scale={{ x: "time", y: "linear" }}>
        <VictoryLine
          style={{
            data: { stroke: "#333", strokeWidth: 2 },
            parent: { border: "1px solid #ccc" },
          }}
          data={data.map(point => ({
            x: point.Timestamp,
            y: point[statistic],
          }))}
          interpolation="bundle"
        />
        <VictoryAxis crossAxis tickCount={5} />
        <VictoryAxis
          dependentAxis
          tickFormat={t => `${t}${suffix}`}
          style={{
            grid: { stroke: "#bbb" },
            axis: { stroke: "transparent" },
          }}
        />
      </VictoryChart>
    </ChartContainer>
  </AppContainer>
);
