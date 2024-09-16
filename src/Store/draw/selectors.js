import { createSelector } from "reselect";

export const self = (state) => state.draw;

export const getIsViewModeSelector = createSelector(
  self,
  (data) => data.isViewMode || null
);
export const getIsDrawModeSelector = createSelector(
  self,
  (data) => data.isDrawMode || null
);
export const getIsSelectModeSelector = createSelector(
  self,
  (data) => data.isSelectMode || null
);
export const getIsAutoDrawModeSelector = createSelector(
  self,
  (data) => data.isAutoDrawMode || null
);
export const getPencilConfigSelector = createSelector(
  self,
  (data) => data.pencilConfig || null
);
export const getMarkersConfigSelector = createSelector(
  self,
  (data) => data.markersConfig || null
);
export const getErasorConfigSelector = createSelector(
  self,
  (data) => data.eraserConfig || null
);
export const getBrushTypeSelector = createSelector(
  self,
  (data) => data.brushType || null
);

export const getBrushColorSelector = createSelector(
  self,
  (data) => data.brushColor || "#000"
);
export const getPatternConfigSelector = createSelector(
  self,
  (data) => data.patternConfig || null
);
export const getListSavedColorSelector = createSelector(
  self,
  (data) => data.listSavedColor || []
);
export const getGlobalMountedSelector = createSelector(
  self,
  (data) => data.mounted || false
);
export const getForceClosePopOverSelector = createSelector(
  self,
  (data) => data.forceClose || false
);
export const getBackgroundTransformSelector = createSelector(
  self,
  (data) => data.backgroundTransform || [1, 0, 0, 1, 0, 0]
);
export const getBoardLockedSelector = createSelector(
  self,
  (data) => data.locked || false
);
export const getOpenMathEditorSelector = createSelector(
  self,
  (data) => data.openMathEditor || false
);
export const getIsHideAllUISelector = createSelector(
  self,
  (data) => data.isHideUI || null
);
export const getIsShowSettingSelector = createSelector(
  self,
  (data) => data.isShowSetting || false
);
export const getImageCropSrcSelector = createSelector(
  self,
  (data) => data.imageCropSrc || null
);
