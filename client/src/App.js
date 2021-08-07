import React, { useRef, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [xCor, setXCor] = useState(0);
  const [yCor, setYCor] = useState(0);

  const getXY = (el) => {
    setXCor(el.screenX)
    setYCor(el.screenY)
  }

  return (
    <>
      <div className="App" onMouseDown={getXY}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            x coordinate: {xCor}
            <br></br>
            y coordinate: {yCor}
          </p>
        </header>
      </div>
      <p>
        x coordinate: {xCor} 
        <br></br>
        y coordinate: {yCor}
      </p>
    </>
  );
}

export default App;
