import React from "react";
//ELECTRON

//ASSest
import IconEye from "@assets/images/eyeopen.png";
import { useDispatch } from "react-redux";
//STORE
import { setHideUI } from "@Store/draw";

import classNames from "classnames";

export default function HideUIButton({ canvas, rotate }) {
  const dispatch = useDispatch();

  const handleHide = () => {
    document.body.style = "overflow: hidden;background-color:transparent;";

    dispatch(setHideUI(true));
  };

  return (
    <div
      onClick={handleHide}
      className={classNames("button-toolbar", {
        rotate: !!rotate,
      })}
    >
      <img src={IconEye} />
    </div>
  );
}
