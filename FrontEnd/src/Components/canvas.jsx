import React, { useRef, useState, useEffect } from "react";
import "./Canvas.css";
import { Split } from "@geoffcox/react-splitter"

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2d2d2d");
  const [size, setSize] = useState("3");
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //Load from locastorage
    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
  }, [ctx]);


  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    draw(nativeEvent);
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const clearCanvas = () => {
    localStorage.removeItem("canvasimg");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#2d2d2d";
    context.fillRect(0, 0, canvas.width, canvas.height);

    //Passing clear screen
    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      var dataUrl = canvas.toDataURL('./blackboard.jpg'); 
      localStorage.setItem("canvasimg", dataUrl);
    }, 400);
  };

  const getPen = () => {
    // {style={{cursor:"pointer"}}
    // setCursor(('./pencil.cur'));
    setCursor("pointer");
    // {style="cursor: url(images/special.cur),auto;"}
    setSize("3");
    setColor("white");
  };
  
  const eraseCanvas = (e) => {
    setCursor("grab");
    setSize("20");
    setColor("#2d2d2d");

    if (!isDrawing) {
      return;
    }
  };

  return (
    <>
    <Split horizontal initialPrimarySize="90%" minSecondarySize={size} splitterSize="0%" >
    <div className="CanvasRoot">
      <div className="canvas-btn">
        <button onClick={getPen} className="btn-width cursor">
        <img src={require('./pencil.png')} className="pencil" />
        </button>
        <div >
          <input
            className="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <select
            className="btn-width size-selector"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select> 
        </div>
        <div>
          <button onClick={eraseCanvas} className="btn-width">
            <img src={require('./eraser.png')} className="eraser" />
          </button>
        </div>
        <button onClick={clearCanvas} className="btn-width">
        <img src={require('./clear.png')} className="clear" />
        </button>
      </div>
      <canvas
        style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
      />
      </div>
      </Split>
    </>
  );
}
