import { Slider } from "antd";
import React from "react";
import { DEFAULT_PEN_COLOR } from "@utils/constants";

function PencilConfigPopup({
  strokeWidth = 0,
  color = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  },
  onAfterChange,
  onChange,
  onChangeColor = () => {},
}) {
  const getColorString = (item) => {
    return `rgba(${item?.r},${item?.g},${item?.b},${item?.a})`;
  };
  const isActive = (item) => {
    return getColorString(color) === getColorString(item);
  };
  return (
    <div className="pen-config__popup">
      <Slider
        min={1}
        max={30}
        value={strokeWidth}
        onAfterChange={onAfterChange}
        onChange={onChange}
      />
      <span className="slider-label">Thickness</span>
      <div className="pen-config__list-color">
        {DEFAULT_PEN_COLOR.map((item, index) => (
          <div className={"pen-config__color-btn-outer "}>
            <div
              onClick={() => {
                onChangeColor(item);
              }}
              className={
                "pen-config__color-btn " + (isActive(item) ? "active" : "")
              }
              style={{ backgroundColor: getColorString(item) }}
              key={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PencilConfigPopup;
