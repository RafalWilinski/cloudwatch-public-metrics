import React from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
`;

class App extends React.Component {
  render() {
    console.log('Rendering!!!');
    
    return (
      <div onClick={() => console.log('huj')}>
      <AppContainer  onClick={() => console.log('huj')}>💅</AppContainer>
      </div>
    )
  }

  componentDidMount() {
    console.log('jeebac: ' + this.props);
  }
}

export default App;
