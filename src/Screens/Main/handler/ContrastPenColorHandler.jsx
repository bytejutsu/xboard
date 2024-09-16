import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

//STORE
import { setBrushColor } from "../../../Store/draw";
import { getCurrentBoardDataSelector } from "../../../Store/board/selectors";
//UTILS
import equal from "fast-deep-equal";
import { invertColor, hexToRgb } from "../../../utils/color";

export default function ContrastPenColorHandler({ canvas }) {
  const firstTime = React.useRef(true);
  const dispatch = useDispatch();
  const boardData = useSelector(getCurrentBoardDataSelector, (prev, next) => {
    const prevProps = {
      type: prev?.backgroundType,
      color: prev?.backgroundColor,
      image: prev?.backgroundImage,
    };
    const nextProps = {
      type: next?.backgroundType,
      color: next?.backgroundColor,
      image: next?.backgroundImage,
    };
    return equal(prevProps, nextProps);
  });

  const changeBrushColor = () => {
    const invertedColor = invertColor(
      typeof boardData?.backgroundColor === "string"
        ? boardData?.backgroundColor
        : "#FFFFFF"
    );
    dispatch(setBrushColor(hexToRgb(invertedColor)));
  };

  React.useEffect(() => {
    // changeBrushColor();
  }, [boardData?.backgroundColor]);
  return null;
}
