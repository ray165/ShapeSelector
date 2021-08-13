import React, { useState, useRef, useEffect } from "react";
// import "./board.css";
// from the guide https://blog.ranaemad.com/whiteboard-react-hooks-ckclrvccg0005fls16f1h80mc

/**
 * contains three major events. onMouseDown, onMouseUP and onMouseMove
 * @returns board
 */
function Board() {
  const canvasRef = useRef(null);
  const boardRef = useRef(null);
  const [ctx, setCtx] = useState({});
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let canv = canvasRef.current;
    canv.width = boardRef.current.offsetWidth
    canv.height = boardRef.current.offsetHeight

    let canvCtx = canv.getContext("2d"); //<canvas> HTML property
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";
    canvCtx.lineWidth = 5;
    // canvCtx.fillStyle = "#FF0000"
    setCtx(canvCtx);

    let offSet = canv.getBoundingClientRect(); // Element API... returns the size & position relative to the viewport
    setCanvasOffset({ x: parseInt(offSet.left), y: parseInt(offSet.top) });
    return () => {
      setCtx({});
    };
  }, [ctx]);


  function handleMouseDown(e) {
    // setDrawing(true);
    setPosition({
      x: parseInt(e.clientX - canvasOffset.x),
      y: parseInt(e.clientY - canvasOffset.y),
    });
    console.log("down clicked!", drawing);
    setDrawing(true);
  }

  function handleMouseUp() {
    setDrawing(false);
  }

  function handleMouseMove(e) {
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    console.log("running")
    if (drawing) {
      ctx.strokeStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
    }
    setPosition({ x: mousex, y: mousey });
  }



  return (
    <div className="board" ref={boardRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}

export default Board;
