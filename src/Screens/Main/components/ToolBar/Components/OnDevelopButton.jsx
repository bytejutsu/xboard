import React from "react";
//ASSest
import IconMath from "@assets/images/math.png";
import { useDispatch } from "react-redux";
import { setOpenMathEditor } from "@Store/draw";

import DOCS from "@assets/images/docs.png";
import SGK from "@assets/images/sgk.png";
import RULER from "@assets/images/ruler.png";
import VIDEO from "@assets/images/video.png";
import ADD_TEXT from "@assets/images/add-text.png";
import CHART from "@assets/images/chart.png";
import RECORD from "@assets/images/record.png";
import TEXT_DOCS from "@assets/images/msoffice.png";
import FILE from "@assets/images/file.png";
import classNames from "classnames";

export default function OnDevelopButton({
  canvas,
  rotate,
  rotateLeft,
  type = "DOCS",
}) {
  const handleOpenMathEditor = () => {
    alert("Tính năng đang trong quá trình phát triển!");
  };

  const getImage = () => {
    switch (type) {
      case "RULER":
        return <img src={RULER} />;
      case "SGK":
        return <img src={SGK} />;
      case "DOCS":
        return <img src={DOCS} />;
      case "VIDEO":
        return <img src={VIDEO} />;

      case "ADD_TEXT":
        return <img src={ADD_TEXT} />;
      case "RECORD":
        return <img src={RECORD} />;
      case "TEXT_DOCS":
        return <img src={TEXT_DOCS} />;
      case "CHART":
        return <img src={CHART} />;
      case "FILE":
        return <img src={FILE} />;
    }
  };

  return (
    <div
      onClick={handleOpenMathEditor}
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        rotate: rotate,
      })}
    >
      {getImage()}
    </div>
  );
}
