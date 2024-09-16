import React from "react";
import "./styles.scss";
import useToggleMode from "@Hooks/useToggleMode";
import { useSelector } from "react-redux";
import {
  getBackgroundTransformSelector,
  getBrushTypeSelector,
  getErasorConfigSelector,
  getGlobalMountedSelector,
} from "@Store/draw/selectors";
import { BRUSH_TYPE } from "../../drawcore/TBoardDraw";
function EraserCustomCusor({ canvas }) {
  const { isDrawMode } = useToggleMode();
  const brushType = useSelector(getBrushTypeSelector);
  const mounted = useSelector(getGlobalMountedSelector);

  const moveCursor2 = (e) => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%),0)`;
  };
  const mouseDownCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    cursor.classList.add("click");
  };
  const mouseUpCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    cursor.classList.remove("click");
  };

  const touchMoveCursor2 = (e) => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    if (!e.changedTouches?.length) {
      return;
    }
    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%),0)`;
  };
  const touchDownCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    cursor.classList.add("click");
  };
  const touchUpCursor = () => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) {
      return;
    }
    cursor.classList.remove("click");
  };

  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    const ele = document.querySelector(".upper-canvas");
    if (!ele) return;
    ele.addEventListener("touchmove", touchMoveCursor2);
    ele.addEventListener("touchstart", touchDownCursor);
    ele.addEventListener("touchend", touchUpCursor);

    ele.addEventListener("mousemove", moveCursor2);
    ele.addEventListener("mousedown", mouseDownCursor);
    ele.addEventListener("mouseup", mouseUpCursor);

    return () => {
      ele.removeEventListener("mousemove", moveCursor2);
      ele.removeEventListener("mousedown", mouseDownCursor);
      ele.removeEventListener("mouseup", mouseUpCursor);

      ele.removeEventListener("touchmove", touchMoveCursor2);
      ele.removeEventListener("touchstart", touchDownCursor);
      ele.removeEventListener("touchend", touchUpCursor);
    };
  }, [mounted]);

  React.useEffect(() => {
    if (!canvas.current) return;
    if (
      isDrawMode &&
      (brushType === BRUSH_TYPE.ERASER_DEF ||
        brushType === BRUSH_TYPE.ERASER_GROUP)
    ) {
      canvas.current.canvas.freeDrawingCursor = "none";
    } else {
      canvas.current.canvas.freeDrawingCursor = "crosshair";
    }
  }, [isDrawMode, brushType]);

  const hide = !isDrawMode;

  return <div className={"cursor " + (hide ? "hide" : "")}></div>;
}

export default EraserCustomCusor;
