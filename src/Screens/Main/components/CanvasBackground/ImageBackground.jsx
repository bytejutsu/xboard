import React, { useState } from "react"

const ImageBackground = (props) => {
  return (
    <div
      id="background-transform"
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
      <img
        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        src={props?.image}
      />
    </div>
  )
}
export default ImageBackground
