import React from 'react';
import styled, {keyframes} from "styled-components";

function App() {
  return (
    <div className="App">
      <Box></Box>
    </div>
  );
}

const Move = keyframes`
  0% {
    top: 20px;
    opacity: 1;
    background-color: green;
  }
  30% {
    top: 50px;
    opacity: 1;
    background-color: orange;
  }
  50% {
    top: 200px;
    opacity: 0;
    left: 200px;
  }
  80% {
    top: 150px;
  }
  100% {
    top: 20px;
    opacity: 1;
    left: 20px;
    background-color: green;
  }
`

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: green;
  border-radius: 150px;
  position: absolute;
  top: 20px;
  left: 20px;
  animation: ${Move} 2s 1s infinite;
`;

export default App;
