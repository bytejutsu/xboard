import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { createSlice } from "@reduxjs/toolkit";
import { BRUSH_TYPE } from "../../Screens/Main/drawcore/TBoardDraw";

const lineDefaultConfig = {
  width: 20,
  opacity: 1,
  dashArray: [],
};

const markersDefaultConfig = {
  width: 40,
  opacity: 0.5,
};
const patternConfigDefault = {
  svg: "pattern1",
  width: 5,
  opacity: 1,
};
const eraserConfigDefault = {
  isPixelClear: true,
  width: 50,
};
const initialState = {
  isViewMode: true,
  isSelectMode: false,
  isDrawMode: false,
  isAutoDrawMode: false,
  brushType: BRUSH_TYPE.PENCIL,
  pencilConfig: { ...lineDefaultConfig },
  markersConfig: { ...markersDefaultConfig },
  eraserConfig: { ...eraserConfigDefault },
  patternConfig: { ...patternConfigDefault },
  brushColor: { r: 242, g: 71, b: 38, a: 1 },
  listSavedColor: [],
  mounted: false,
  forceClose: 0,
  backgroundTransform: [1, 0, 0, 1, 0, 0],
  locked: false,
  openMathEditor: false,
  isHideUI: false,
  isShowSetting: false,
  imageCropSrc: null,
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    setIsViewMode: (state, action) => {
      state.isViewMode = action.payload;
    },
    setPencilConfig: (state, action) => {
      state.pencilConfig = action.payload;
    },
    setMarkersConfig: (state, action) => {
      state.markersConfig = action.payload;
    },
    setEraserConfig: (state, action) => {
      state.eraserConfig = action.payload;
    },
    setBrushType: (state, action) => {
      state.brushType = action.payload;
    },
    setBrushColor: (state, action) => {
      state.brushColor = action.payload;
    },
    setPatternConfig: (state, action) => {
      state.patternConfig = action.payload;
    },
    setListSavedColor: (state, action) => {
      state.listSavedColor = action.payload;
    },
    setIsSelectMode: (state, action) => {
      state.isSelectMode = action.payload;
    },
    setIsAutoDrawMode: (state, action) => {
      state.isAutoDrawMode = action.payload;
    },
    setIsDrawMode: (state, action) => {
      state.isDrawMode = action.payload;
    },
    setGlobalMounted: (state, action) => {
      state.mounted = action.payload;
    },
    setForceClosePopOver: (state, action) => {
      state.forceClose = action.payload;
    },
    setBackgroundTransform: (state, action) => {
      state.backgroundTransform = action.payload;
    },
    setLocked: (state, action) => {
      state.locked = action.payload;
    },
    setOpenMathEditor: (state, action) => {
      state.openMathEditor = action.payload;
    },
    setHideUI: (state, action) => {
      state.isHideUI = action.payload;
    },
    setIsShowSetting: (state, action) => {
      state.isShowSetting = action.payload;
    },
    setImageCropSrc: (state, action) => {
      state.imageCropSrc = action.payload;
    },
    clearState: (state) => {
      state.openMathEditor = false;
    },
  },
});

export const {
  setIsViewMode,
  setPencilConfig,
  setMarkersConfig,
  setEraserConfig,
  setBrushType,
  setBrushColor,
  setPatternConfig,
  setListSavedColor,
  setIsDrawMode,
  setIsSelectMode,
  setIsAutoDrawMode,
  setGlobalMounted,
  setForceClosePopOver,
  setBackgroundTransform,
  setLocked,
  setOpenMathEditor,
  setHideUI,
  setIsShowSetting,
  setImageCropSrc,
  clearState,
} = drawSlice.actions;

const persistConfig = {
  key: "draw",
  storage: storage,
  blacklist: ["openMathEditor", "imageCropSrc"],
};

export default persistReducer(persistConfig, drawSlice.reducer);
