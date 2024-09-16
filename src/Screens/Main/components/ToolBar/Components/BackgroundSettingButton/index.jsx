import React from "react";
//COMPONENT

import BackgroundSettingPopup from "./BackgroundSettingPopup";
//ASSest
import IconImage from "@assets/images/bg-setting.png";
import CustomPopover from "../../../CustomPopover";
import { getBoardLockedSelector } from "@Store/draw/selectors";
import { useSelector } from "react-redux";
import { SettingIcon } from "@assets/svg";
import { Tooltip } from "antd";
export default function BackgroundSetting({ rotate, canvas, rotateLeft }) {
  const locked = useSelector(getBoardLockedSelector);
  return (
    <CustomPopover
      placement="bottomRight"
      content={<BackgroundSettingPopup />}
      trigger="click"
      overlayClassName="background-popup"
    >
      <Tooltip title="Background">
        <div
          style={locked ? { pointerEvents: "none" } : null}
          className={
            "image-picker-button__container " +
            (rotateLeft && rotate ? "rotate-left " : "") +
            (rotate ? "rotate" : "")
          }
        >
          <SettingIcon />
        </div>
      </Tooltip>
    </CustomPopover>
  );
}
