import React from "react";
//ASSest
import IconClean from "@assets/images/clean.png";
import classNames from "classnames";

export default function CleanButton({ canvas, rotate, rotateLeft }) {
  const handleClear = () => {
    canvas.current?.clearCanvas();
  };
  return (
    <div
      onClick={handleClear}
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        rotate: rotate,
      })}
    >
      <img src={IconClean} />
    </div>
  );
}
