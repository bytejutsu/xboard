import React, { useState } from "react";

const SolidBackground = (props) => {
  const width = window.screen.width * 4;
  const height = window.screen.height * 4;
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
      <div
        style={{
          position: "absolute",
          top: -height / 2.5,
          left: -width / 2.5,
          width: width,
          height: height,
          backgroundColor: props?.backgroundColor || "#fff",
        }}
      ></div>
    </div>
  );
};
export default SolidBackground;
