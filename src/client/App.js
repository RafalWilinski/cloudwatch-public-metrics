import React from "react";
import styled from "styled-components";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
`;

// todo: małe jasne labelki
// brak osi pionowej
// subheading title nazwa metryki
// wartosc latest jako big liczba
// chart next to it
class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <VictoryChart theme={VictoryTheme.grayscale} scale={{ x: "time", y: "linear" }}>
          <VictoryLine
            style={{
              data: { stroke: "#333", strokeWidth: 1 },
              parent: { border: "1px solid #ccc" },
            }}
            data={this.props.data.map(point => ({
              x: point.Timestamp,
              y: point[this.props.statistic],
            }))}
            interpolation="bundle"
          />
        </VictoryChart>
      </AppContainer>
    );
  }
}

export default App;
