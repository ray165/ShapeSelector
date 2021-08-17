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
    });
    setDrawing(true);
  }

  function handleMouseUp() {
    setDrawing(false);
    if ((recDivRef.current.hidden = 0)) {
      recDivRef.current.hidden = 1; // hide it again on mouse release
      console.log("hide the div", recDivRef.current.hidden)
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
      // So... when drawing a rectangle... it'll continuous DRAW on the screen.
      // I only want it to finalize when i release the mouse
      recDivRef.current.hidden = false;
      recDivRef.current.style.left = `${position.x}px`;
      recDivRef.current.style.top = `${position.y}px`;
      recDivRef.current.style.width = `${mousex}px`;
      recDivRef.current.style.height = `${mousey}px`;
      console.log(recDivRef.current.getBoundingClientRect(), "Hidden status", recDivRef.current.hidden)
    } else if (drawing) {
      ctx.strokeStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
    }
    setPosition({ x: mousex, y: mousey });
  }

  return (
    <>
      <Controls
        setClear={setClear}
        setRecMode={setRecMode}
        setDrawMode={setDrawMode}
      />
      <div className="board" ref={boardRef}>
        <div id="recDiv" ref={recDivRef} ></div>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >

        </canvas>
      </div>
    </>
  );
}

export default Board;
