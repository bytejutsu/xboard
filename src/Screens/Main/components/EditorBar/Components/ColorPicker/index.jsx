import React from "react";
//COMPONENT
import { Popover } from "antd";

import ColorPickerPopup from "./ColorPickerPopup";
import IconImage from "@assets/images/color-picker.png";
import CustomPopover from "../../../CustomPopover";
export default function ColorPicker({ handleChangeColor }) {
  return (
    <CustomPopover
      placement="topRight"
      content={<ColorPickerPopup handleChangeColor={handleChangeColor} />}
      trigger="click"
      overlayClassName="color-popup"
    >
      <div className="btn-label pointer">Change Color</div>
    </CustomPopover>
  );
}
