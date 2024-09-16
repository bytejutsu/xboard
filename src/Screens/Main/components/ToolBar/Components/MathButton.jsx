import React from "react";
//ASSest
import IconMath from "@assets/images/math.png";
import { useDispatch } from "react-redux";
import { setOpenMathEditor } from "@Store/draw";
import classNames from "classnames";
import { MathIcon } from "../../../../../assets/svg";

export default function MathButton({ canvas, rotate, rotateLeft }) {
  const dispatch = useDispatch();
  const handleOpenMathEditor = () => {
    dispatch(setOpenMathEditor(true));
  };
  return (
    <div
      onClick={handleOpenMathEditor}
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        rotate: rotate,
      })}
    >
      <MathIcon />
    </div>
  );
}
