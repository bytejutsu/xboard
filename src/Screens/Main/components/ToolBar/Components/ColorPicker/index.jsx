import React from "react"
//COMPONENT
import { Popover } from "antd"

import ColorPickerPopup from "./ColorPickerPopup"
//ASSest
import IconImage from "@assets/images/color-picker.png"
import CustomPopover from "../../../CustomPopover"
export default function ColorPicker({ handleClick = () => {} }) {
  return (
    <CustomPopover
      placement="topRight"
      content={<ColorPickerPopup />}
      trigger="click"
      overlayClassName="color-popup"
    >
      <div onClick={handleClick} className="color-picker-button__container">
        <img src={IconImage} />
      </div>
    </CustomPopover>
  )
}
