import React from "react";

// LIB
import classNames from "classnames";

//COMPONENT
import ChoosePencilTypeConfigPopup from "./ChoosePencilTypeConfigPopup";
import CustomPopover from "@Modules/Main/Components/CustomPopover";
import Tooltip from "antd/es/tooltip";

// ASSETS
import { PenIcon } from "@/assets/svg";

export default function ChoosePencilTypeButton({
  onClick = () => {},
  active = false,
  rotate = false,
  rotateLeft,
}) {
  return active ? (
    <CustomPopover
      destroyTooltipOnHide={true}
      placement="leftBottom"
      content={<ChoosePencilTypeConfigPopup />}
      trigger="click"
      overlayClassName="pencil-popup"
    >
      <div
        onClick={onClick}
        className={classNames("button-toolbar", {
          "rotate-left": rotateLeft && rotate,
          active: active,
        })}
      >
        <PenIcon />
      </div>
    </CustomPopover>
  ) : (
    <div
      onClick={onClick}
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        active: active,
      })}
    >
      <PenIcon />
    </div>
  );
}
