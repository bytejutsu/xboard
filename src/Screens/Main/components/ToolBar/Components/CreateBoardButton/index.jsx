import React from "react";
//COMPONENT

import BackgroundSettingPopup from "./BackgroundSettingPopup";
//ASSest
import CustomPopover from "../../../CustomPopover";
import useBoardManager from "@Hooks/useBoardManager";
import { CUSTOM_EXPORT_FIELD } from "@constants";
import useToggleMode from "@Hooks/useToggleMode";
import classNames from "classnames";
import { PlusFilledIcon } from "@assets/svg";
export default function CreateBoardButton({ rotate, canvas, rotateLeft }) {
  const { saveBoardCanvas } = useBoardManager();
  const { toggleDrawMode } = useToggleMode();
  const handleSave = () => {
    toggleDrawMode();
    saveBoardCanvas(canvas.current?.canvas?.toJSON(CUSTOM_EXPORT_FIELD));
    canvas.current?.clearCanvas();
  };
  return (
    <CustomPopover
      placement="rightBottom"
      content={<BackgroundSettingPopup handleSave={() => handleSave()} />}
      trigger="click"
      overlayClassName="background-popup"
    >
      <div
        className={classNames("button-toolbar", {
          "rotate-left": rotateLeft && rotate,
          rotate: rotate,
        })}
      >
        <PlusFilledIcon />
      </div>
    </CustomPopover>
  );
}
