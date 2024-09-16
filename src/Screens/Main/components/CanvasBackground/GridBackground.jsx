import React, { useState } from "react";

const GRID_SPACING = 150;
const GridBackground = (props) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvasRef = React.useRef();
  const draw = (megaCellSize, smallCellSize) => {
    const e = 0;
    const t = 0,
      { width: i, height: s } = { width, height };
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    let o = e % megaCellSize;
    o >= 0 && (o -= megaCellSize);
    let n = t % megaCellSize;
    n >= 0 && (n -= megaCellSize);
    ctx.strokeStyle = "#DEDEDE";

    let r = o;
    for (; r <= i; ) (r += megaCellSize), ctx.moveTo(r, 0), ctx.lineTo(r, s);
    for (r = n; r <= s; )
      (r += megaCellSize), ctx.moveTo(0, r), ctx.lineTo(i, r);
    ctx.stroke();
  };

  React.useEffect(() => {
    var t = 1,
      i = 20;
    let s = t / i;
    for (; s < 1; ) s *= 5;
    let smallCellSize = 16 * s,
      megaCellSize = 5 * smallCellSize,
      smallCellAlpha = 0.0125 * smallCellSize - 0.2,
      skipSmallCells = smallCellAlpha <= 0.2;
    draw(megaCellSize, smallCellSize);
  }, []);
  return (
    <div
      style={{
        transformOrigin: "0px 0px",
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <canvas
        id="grid_background"
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: props?.backgroundColor,
        }}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      />
    </div>
  );
};
export default GridBackground;
