import React from "react";
import { useSelector } from "react-redux";

import { BRUSH_TYPE } from "../drawcore/TBoardDraw";

import { PatternString } from "../constants/patternString";
import {
  getErasorConfigSelector,
  getGlobalMountedSelector,
  getIsDrawModeSelector,
  getMarkersConfigSelector,
  getPatternConfigSelector,
  getBrushColorSelector,
  getBrushTypeSelector,
  getPencilConfigSelector,
  getIsAutoDrawModeSelector,
} from "../../../Store/draw/selectors";

export default function ChangeBrushStyleHandler({ canvas }) {
  const brushType = useSelector(getBrushTypeSelector);
  const brushColor = useSelector(getBrushColorSelector);
  const pencilConfig = useSelector(getPencilConfigSelector);
  const patternConfig = useSelector(getPatternConfigSelector);
  const markersConfig = useSelector(getMarkersConfigSelector);
  const eraserConfig = useSelector(getErasorConfigSelector);
  const isDrawMode = useSelector(getIsDrawModeSelector);
  const isAutoDrawMode = useSelector(getIsAutoDrawModeSelector);
  const mounted = useSelector(getGlobalMountedSelector);

  const _handleChangeBrushType = () => {
    canvas.current?.changeBrushType(
      isDrawMode || isAutoDrawMode ? brushType : "default"
    );
  };

  const getBrushColorWithAlpha = () => {
    let alpha =
      brushType === BRUSH_TYPE.PENCIL
        ? pencilConfig?.opacity
        : brushType === BRUSH_TYPE.HIGHLIGHTER
        ? markersConfig?.opacity
        : patternConfig?.opacity;
    return {
      ...brushColor,
      a: alpha,
    };
  };

  const _handleApplyPencilConfig = () => {
    if (brushType !== BRUSH_TYPE.PENCIL) {
      return;
    }

    canvas.current?.changeStrokeDashStyle(
      pencilConfig?.dashArray?.map((item) => item * pencilConfig?.width) || []
    );
    canvas.current?.changeBrushWidth(pencilConfig?.width || 10);
    canvas.current?.changeBrushColor(getBrushColorWithAlpha());
  };

  const _handleApplyPatternConfig = () => {
    if (brushType !== BRUSH_TYPE.PATTERN) {
      return;
    }
    canvas.current?.changePatternStyle(PatternString[patternConfig?.svg].data);
    canvas.current?.changeBrushWidth(patternConfig?.width);
    canvas.current?.changeBrushColor(getBrushColorWithAlpha());
  };
  const _handleApplyMarkersConfig = () => {
    if (brushType !== BRUSH_TYPE.HIGHLIGHTER) {
      return;
    }
    canvas.current?.changeBrushWidth(markersConfig?.width || 10);
    canvas.current?.changeSprayBrushDensity(markersConfig?.width || 10);
    canvas.current?.changeBrushColor(getBrushColorWithAlpha());
  };
  const _handleApplyEraserConfig = () => {
    if (brushType !== BRUSH_TYPE.ERASER_DEF) {
      return;
    }
    canvas.current?.changeBrushWidth(eraserConfig?.width || 10);
  };

  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    _handleChangeBrushType();
  }, [brushType, isDrawMode, isAutoDrawMode, mounted]);
  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    canvas.current?.changeBrushColor(getBrushColorWithAlpha());
  }, [brushColor, mounted]);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    _handleApplyPencilConfig();
    _handleApplyPatternConfig();
    _handleApplyMarkersConfig();
    _handleApplyEraserConfig();
  }, [
    brushType,
    pencilConfig,
    patternConfig,
    markersConfig,
    eraserConfig,
    isDrawMode,
    isAutoDrawMode,
    mounted,
  ]);
  return null;
}
