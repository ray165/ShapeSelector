import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Board from "./components/board.js"

function App() {
  // const [run, setRun] = useState(false)
  // const [xCor, setXCor] = useState(0);
  // const [yCor, setYCor] = useState(0);

  // const getXY = (el) => {
  //   setXCor(el.screenX)
  //   setYCor(el.screenY)
  // }

  // useEffect(() => {
  //   // effect 
  //   setXCor(run.screenX)
  //   setYCor(run.screenY)
  //   return () => {
  //     // cleanup 
  //     setRun(false)
  //   }
  // }, [run])

  return (
    <>
      <div className="App" 
        // onMouseDown={(el) => {
        //     setRun(el)
        //   }
        // }
        // onMouseUp={() => setRun(false)}
      >
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            x coordinate: {xCor}
            <br></br>
            y coordinate: {yCor}
          </p>
          <Board />
        </header> */}

        <Board />
      </div>
    </>
  );
}

export default App;
