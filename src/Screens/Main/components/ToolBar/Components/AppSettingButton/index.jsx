import React from "react";
import classNames from "classnames";

//ASSest
import IconImage from "@assets/images/app-setting.png";

export default function AppSetting({
  onClick = () => {},
  rotate,
  canvas,
  rotateLeft,
}) {
  return (
    <div
      onClick={onClick}
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        rotate: !!rotate,
      })}
    >
      <img src={IconImage} />
    </div>
  );
}
