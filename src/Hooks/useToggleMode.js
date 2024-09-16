import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsDrawModeSelector,
  getIsSelectModeSelector,
  getIsViewModeSelector,
  getIsAutoDrawModeSelector,
} from "../Store/draw/selectors";
import {
  setBrushType,
  setIsDrawMode,
  setIsSelectMode,
  setIsViewMode,
  setIsAutoDrawMode,
} from "../Store/draw";
import { BRUSH_TYPE } from "../Screens/Main/drawcore/TBoardDraw";

export default function useToggleMode() {
  const dispatch = useDispatch();

  const isDrawMode = useSelector(getIsDrawModeSelector);
  const isSelectMode = useSelector(getIsSelectModeSelector);
  const isViewMode = useSelector(getIsViewModeSelector);
  const isAutoDrawMode = useSelector(getIsAutoDrawModeSelector);
  const setToPencil = () => {
    dispatch(setBrushType(BRUSH_TYPE.PENCIL));
  };
  const toggleDrawMode = (setToDefault = true) => {
    if (setToDefault) {
      dispatch(setBrushType(BRUSH_TYPE.PENCIL));
    }

    if (isDrawMode && !isSelectMode && !isViewMode && !isAutoDrawMode) {
      return;
    }
    if (!isDrawMode) {
      dispatch(setIsViewMode(false));
      dispatch(setIsSelectMode(false));
      dispatch(setIsAutoDrawMode(false));
    }
    dispatch(setIsDrawMode(!isDrawMode));
  };

  const toggleViewMode = (value) => {
    if (value !== undefined && value !== null && typeof value == "boolean") {
      dispatch(setIsViewMode(value));
      if (value) {
        dispatch(setIsDrawMode(false));
        dispatch(setIsSelectMode(false));
        dispatch(setIsAutoDrawMode(false));
      }
      return;
    }
    if (isViewMode && !isSelectMode && !isDrawMode & !isAutoDrawMode) {
      return;
    }
    if (!isViewMode) {
      dispatch(setIsDrawMode(false));
      dispatch(setIsSelectMode(false));
      dispatch(setIsAutoDrawMode(false));
    }
    dispatch(setIsViewMode(!isViewMode));
  };
  const toggleSelectMode = () => {
    if (isSelectMode && !isDrawMode && !isViewMode && !isAutoDrawMode) {
      return;
    }
    if (!isSelectMode) {
      dispatch(setIsViewMode(false));
      dispatch(setIsDrawMode(false));
      dispatch(setIsAutoDrawMode(false));
    }
    dispatch(setIsSelectMode(!isSelectMode));
  };

  const toggleAutoDrawMode = () => {
    if (isAutoDrawMode && !isDrawMode && !isViewMode && !isSelectMode) {
      return;
    }
    if (!isAutoDrawMode) {
      dispatch(setIsViewMode(false));
      dispatch(setIsDrawMode(false));
      dispatch(setIsSelectMode(false));
    }
    dispatch(setIsAutoDrawMode(!isAutoDrawMode));
  };

  return {
    toggleDrawMode,
    toggleViewMode,
    toggleSelectMode,
    toggleAutoDrawMode,
    isDrawMode,
    isSelectMode,
    isViewMode,
    isAutoDrawMode,
    setToPencil,
  };
}
