import React, { useState, useRef, useEffect } from "react";
import "./board.css";
import Controls from "./controls";
// from the guide https://blog.ranaemad.com/whiteboard-react-hooks-ckclrvccg0005fls16f1h80mc

/**
 * contains three major events. onMouseDown, onMouseUP and onMouseMove
 * @returns board
 */
function Board() {
  const canvasRef = useRef(null);
  const boardRef = useRef(null);
  const recDivRef = useRef(null);
  const [drawMode, setDrawMode] = useState(false); // passed to controls
  const [clear, setClear] = useState(false); // pased to controls
  const [recMode, setRecMode] = useState(false); // rectangle selector i.e. draws a rectangle
  const [hidden, setHidden] = useState(true) // hidden rectangle, conditional rendering
  const [ctx, setCtx] = useState({});
  const [drawing, setDrawing] = useState(false); // the action of drawing
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let canv = canvasRef.current;
    canv.width = boardRef.current.offsetWidth;
    canv.height = boardRef.current.offsetHeight;

    let canvCtx = canv.getContext("2d"); //<canvas> HTML property
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";
    canvCtx.lineWidth = 5;
    // canvCtx.fillStyle = "#FF0000"
    setCtx(canvCtx);

    if (clear) {
      setCtx({});
      setClear(false);
    }

    let offSet = canv.getBoundingClientRect(); // Element API... returns the size & position relative to the viewport
    setCanvasOffset({ x: parseInt(offSet.left), y: parseInt(offSet.top) });
    return () => {
      setCtx({});
    };
  }, [ctx, clear]);

  function handleMouseDown(e) {
    // setDrawing(true);
    setPosition({
      x: parseInt(e.clientX - canvasOffset.x),
      y: parseInt(e.clientY - canvasOffset.y),
      // x: parseInt(e.clientX),
      // y: parseInt(e.clientY),
    });
    setDrawing(true);
  }

  function handleMouseUp() {
    setDrawing(false);
    if (!hidden) {
      setHidden(true); // hide rec again on mouse release
    }
  }

  function handleMouseMove(e) {
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    console.log(
      "moving",
      "Recmode is",
      recMode,
      "Stats",
      position,
      mousex,
      mousey
    );

    if (drawing && recMode) {
      ctx.strokeStyle = "#000000";
      var xTLeft = Math.min(mousex, position.x + canvasOffset.x);
      var width = Math.max(mousex, position.x + canvasOffset.x) - xTLeft; // offset from top left of rect to mouse pointer or vice versa
      var yTLeft = Math.min(mousey, position.y + canvasOffset.y);
      var height = Math.max(mousey, position.y + canvasOffset.y) - yTLeft;

      setHidden(false);
      if (!hidden) {
        // recDivRef.current.style.left = `${position.x}px`;
        // recDivRef.current.style.top = `${position.y}px`;
        // recDivRef.current.style.width = e.screenX + 'px' //`${mousex}px`;
        // recDivRef.current.style.height = e.screenY + 'px' //`${mousey}px`;
        recDivRef.current.style.left = `${xTLeft}px`;
        recDivRef.current.style.top = `${yTLeft}px`;
        recDivRef.current.style.width = `${width}px`;
        recDivRef.current.style.height = `${height}px`;
        console.log(recDivRef.current.getBoundingClientRect(), "Hidden status", recDivRef.current.hidden)
      }

    } else if (drawing) {
      ctx.strokeStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
      setPosition({ x: mousex, y: mousey }); //change the last mouse position
    }
    
  }

  return (
    <>
      <Controls
        setClear={setClear}
        setRecMode={setRecMode}
        setDrawMode={setDrawMode}
      />
      <div className="board" 
          ref={boardRef}           
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}>
        {!hidden && <div id="recDiv" ref={recDivRef} ></div>}
        <canvas
          ref={canvasRef}
          // onMouseDown={handleMouseDown}
          // onMouseUp={handleMouseUp}
          // onMouseMove={handleMouseMove}
        >
        </canvas>
      </div>
    </>
  );
}

export default Board;
