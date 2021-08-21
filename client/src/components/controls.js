import React, { useRef } from "react";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Crop54Icon from "@material-ui/icons/Crop54";
import "./controls.css";

export default function Controls(props) {
  const drawRef = useRef(null);
  const recRef = useRef(null);
  // const [color, setColor] = useState("black");
  // useRef for each button so that i can change their style.

  const { setClear, setRecMode, setDrawMode } = props;



  function changeColor(off, on) {
      off.current.style.background = 'inherit'
      on.current.style.background = 'lightgreen'
  }

  return (
    <div>
      <div className="controlBar">
        <IconButton
          ref={drawRef}
          onClick={() => {
            setDrawMode(true);
            setRecMode(false);
            changeColor(recRef, drawRef)
          }}
        >
          <CreateIcon />
          <p>Free Draw</p>
        </IconButton>
        <IconButton
          ref={recRef}
          onClick={() => {
            setRecMode(true);
            setDrawMode(false);
            changeColor(drawRef, recRef)
          }}
        >
          <Crop54Icon />
          <p>Rectangle Selector</p>
        </IconButton>
        <IconButton
          onClick={() => {
            setClear(true);
          }}
        >
          <LayersClearIcon />
          <p>Clear Screen</p>
        </IconButton>
      </div>
    </div>
  );
}
