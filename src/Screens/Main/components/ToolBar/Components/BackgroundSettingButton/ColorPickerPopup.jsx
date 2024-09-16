import React, { useState } from "react";
//COMPONENT
import { ChromePicker } from "react-color";
import { rgbToHex } from "@utils/color";

export default function ColorPickerPopup({ onSubmit = () => {} }) {
  const [activeColor, setActiveColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  return (
    <div className="color-config__popup">
      <div className="color-picker__container">
        <ChromePicker
          color={activeColor}
          onChangeComplete={(c) => {
            setActiveColor(c.rgb);
          }}
        />
        <div
          onClick={() => {
            onSubmit(rgbToHex(activeColor.r, activeColor.g, activeColor.b));
          }}
          className="submit-btn"
        >
          Xong
        </div>
      </div>
    </div>
  );
}
