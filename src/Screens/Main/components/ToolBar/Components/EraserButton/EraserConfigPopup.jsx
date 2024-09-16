import React, { useState } from "react";
//COMPONENT
import { Popover, Slider } from "antd";
import { AlphaPicker } from "react-color";

//ASSETES
import { PencilPreview } from "@assets/svg";
import { useDispatch, useSelector, useStore } from "react-redux";

import { setBrushType, setEraserConfig } from "@Store/draw";
import { PatternString } from "../../../../constants/patternString";
import {
  getBrushTypeSelector,
  getErasorConfigSelector,
} from "@Store/draw/selectors";
import { BRUSH_TYPE } from "../../../../drawcore/TBoardDraw";
import { handleScaleCursor } from "../../../../utils";

const PatternTypes = Object.values(PatternString);

export default function PatternConfigPopup({ canvas }) {
  const store = useStore();
  const dispatch = useDispatch();

  const patternConfig = useSelector(getErasorConfigSelector);
  const brushType = useSelector(getBrushTypeSelector);

  const [strokeWidth, setStrokeWidth] = useState(patternConfig?.width || 10);

  const [isPixelClear, setIsPixelClear] = useState(
    brushType === BRUSH_TYPE.ERASER_DEF
  );

  const handleChangeConfig = (id, stroW) => {
    dispatch(
      setEraserConfig({
        isPixelClear: id,
        width: stroW,
      })
    );
    const transform = canvas.current.canvas.viewportTransform;
    handleScaleCursor(transform, store, stroW);
  };

  const changeEraserType = (isPixel = false) => {
    if (isPixel) {
      dispatch(setBrushType(BRUSH_TYPE.ERASER_DEF));
    } else {
      dispatch(setBrushType(BRUSH_TYPE.ERASER_GROUP));
    }
  };
  return (
    <div className="pencil-config__popup">
      <div className="label">Nét bút</div>
      <div className="list-eraser d-flex flex-row flex-wrap">
        <div
          onClick={() => {
            setIsPixelClear(true);
            handleChangeConfig(true, strokeWidth);
            changeEraserType(true);
          }}
          className={"eraser-item " + (isPixelClear ? "active" : "")}
        >
          Xoá điểm ảnh
        </div>
        <div
          onClick={() => {
            setIsPixelClear(false);
            handleChangeConfig(false, strokeWidth);
            changeEraserType(false);
          }}
          className={"eraser-item " + (!isPixelClear ? "active" : "")}
        >
          Xoá đối tượng
        </div>

        <div className={"option-collapse " + (isPixelClear ? "open" : "")}>
          <div className="label">Xem trước</div>
          <div className="pencil-review__container">
            <PencilPreview
              color={"#000"}
              strokeWidth={strokeWidth / 6}
              height={120}
            />
          </div>
          <div className="preview__container"></div>
          <div className="label">Kích cỡ</div>
          <div className="weight-slider">
            <Slider
              min={1}
              max={400}
              value={strokeWidth}
              onChange={(v) => setStrokeWidth(v)}
              onAfterChange={(v) => {
                handleChangeConfig(isPixelClear, v);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
