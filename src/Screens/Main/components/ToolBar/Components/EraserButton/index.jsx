import React from "react";

// COMPONENTS
import EraserConfigPopup from "./EraserConfigPopup";
import ButtonIcon from "@/Components/ButtonIcon";
import CustomPopover from "../../../CustomPopover";

// ASSETS
// import IconImageRotate from "@assets/images/pen2-rotate.png";
// import IconImage from "@assets/images/pen2.png";
import { EraserIcon } from "@assets/svg";

export default function Eraser({
  onClick = () => {},
  active = false,
  title,
  canvas,
}) {
  return active ? (
    <CustomPopover
      placement="right"
      content={<EraserConfigPopup canvas={canvas} />}
      trigger="click"
      overlayClassName="pencil-popup"
    >
      <ButtonIcon title={title} onClick={onClick} active={active}>
        <EraserIcon />
      </ButtonIcon>
    </CustomPopover>
  ) : (
    <ButtonIcon title={title} onClick={onClick} active={active}>
      <EraserIcon />
    </ButtonIcon>
  );
}
