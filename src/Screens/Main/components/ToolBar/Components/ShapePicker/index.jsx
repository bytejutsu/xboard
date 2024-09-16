import React from "react";
//COMPONENT

import ShapePickerPopup from "./ShapePickerPopup";
//ASSest
import CustomPopover from "../../../CustomPopover";
import { convertTransformMatrix, getImageScaleValue } from "@utils/position";
import { useDispatch, useStore } from "react-redux";
import { setForceClosePopOver } from "@Store/draw";
import useToggleMode from "@Hooks/useToggleMode";
import { invertColor } from "@utils/color";

import { fabric } from "fabric";
import { ShapeIcon } from "@/assets/svg";
import ButtonIcon from "@/Components/ButtonIcon";

export default function ColorPicker({ canvas, title, active }) {
  const dispatch = useDispatch();
  const store = useStore();
  const { toggleViewMode } = useToggleMode();
  const handleAddShape = (str) => {
    fabric.loadSVGFromString(str, function (object, option) {
      const currentBoard = store
        .getState()
        .board.listBoard?.find(
          (item) => item?.id === store.getState().board?.currentBoardId
        );
      const vp = canvas.current.canvas.viewportTransform;
      const { zoom } = convertTransformMatrix(vp);
      let shape = fabric.util.groupSVGElements(object, option);
      let scale = getImageScaleValue(
        shape.width * zoom,
        shape.height * zoom,
        4
      );
      shape.scale(scale);
      canvas.current.centerObjectByViewPort(shape);

      if (currentBoard) {
        let bgColor = currentBoard?.backgroundColor || "#FFFFFF";
        let inverted = invertColor(bgColor, true);
        if (!shape._objects?.length) {
          shape.set("stroke", inverted);
        } else {
          shape?._objects?.forEach((ele) => {
            ele.set("fill", inverted);
          });
        }
      }

      shape.scale((1 / zoom) * 2);
      canvas.current.canvas.add(shape);
      canvas.current.canvas.setActiveObject(shape);
      canvas.current.canvas.requestRenderAll();
      dispatch(setForceClosePopOver(Date.now()));
      toggleViewMode(true);
    });
  };
  return (
    <CustomPopover
      placement="right"
      content={<ShapePickerPopup handleAddShape={handleAddShape} />}
      trigger="click"
      overlayClassName="shape-popup"
    >
      <ButtonIcon active={active} title={title}>
        <ShapeIcon />
      </ButtonIcon>
    </CustomPopover>
  );
}
