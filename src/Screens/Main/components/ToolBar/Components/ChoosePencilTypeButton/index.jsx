import React from "react";

//COMPONENT
import ChoosePencilTypeConfigPopup from "./ChoosePencilTypeConfigPopup";
import CustomPopover from "../../../CustomPopover";
import ButtonIcon from "@/Components/ButtonIcon";

// ASSETS
import { PenIcon } from "@/assets/svg";

export default function ChoosePencilTypeButton({
  onClick = () => {},
  active = false,
  title,
}) {
  return (
    <ButtonIcon title={title} onClick={onClick} active={active}>
      <PenIcon />
    </ButtonIcon>
  );
}
