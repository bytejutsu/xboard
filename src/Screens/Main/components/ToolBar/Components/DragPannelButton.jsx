import React from "react";
import ButtonIcon from "@/Components/ButtonIcon";
import { CursorPointerIcon } from "../icons";
import useToggleMode from "@Hooks/useToggleMode";

export default function DragPanelButton() {
  const { isViewMode, toggleViewMode } = useToggleMode();
  return (
    <ButtonIcon title={"Select"} onClick={toggleViewMode} active={isViewMode}>
      <CursorPointerIcon />
    </ButtonIcon>
  );
}
