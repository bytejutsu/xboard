import React, { useState, useRef, useEffect } from "react";

//STYLE
import "./styles/index.scss";
//COMPONENt
import LoadingOverlay from "./components/LoadingOverlay";
import Toolbar from "./components/ToolBar";
import EditorBar from "./components/EditorBar";
import CanvasBackground from "./components/CanvasBackground";
import AppBubble from "./components/AppBubble";
import Pagination from "./components/Pagination/Pagination";
import EraserCustomCursor from "./components/EraserCustomCursor";
import MathEditor from "./components/MathEditor";
import AppSetting from "./components/AppSetting";
import CropImage from "./components/CropImage";

//HANDLER
import ChangeViewModeHandler from "./handler/ChangeViewModeHandler";
import ChangeBrushStyleHandler from "./handler/ChangeBrushStyleHandler";
import MultipleTouchManagerHandler from "./handler/MultipleTouchManagerHandler";
import ContrastPenColorHandler from "./handler/ContrastPenColorHandler";
import OpenFileHandler from "./handler/OpenFileHandler";
//REDUX
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  clearState,
  setBackgroundTransform,
  setForceClosePopOver,
  setGlobalMounted,
  setIsShowSetting,
} from "../../Store/draw";
import { getCurrentBoardIdSelector } from "../../Store/board/selectors";

import {
  getBoardLockedSelector,
  getIsHideAllUISelector,
} from "../../Store/draw/selectors";
import {
  initFabric,
  handleScaleCursor,
  handleTrasnformBackground,
} from "./utils";
import AppLayout from "../../Components/AppLayout";
import RerenderBoardHandler from "./handler/RerenderBoardHandler";
import useBoardManager from "@Hooks/useBoardManager";
import { CUSTOM_EXPORT_FIELD } from "./constants";
import Header from "./components/Header";

import AutoDraw from "./components/AutoDraw";
import { DEFAULT_VIEW_PORT } from "../../utils/constants";
import { clearUndoRedo } from "../../Store/board";

const CanvasComponent = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const locked = useSelector(getBoardLockedSelector);

  const canvasRef = React.useRef();
  const fabricRef = React.useRef();
  const toolbarRef = React.useRef();
  const editorRef = React.useRef();
  const viewModeHandlerRef = React.useRef();
  const mathEditorRef = React.useRef();
  const autoDrawRef = React.useRef();

  const { saveBoardCanvas } = useBoardManager();

  const isHideAllUI = useSelector(getIsHideAllUISelector);

  const transformListener = React.useCallback((trans) => {
    handleTrasnformBackground(trans);
    handleScaleCursor(trans, store);
  }, []);
  const selectObjectListener = React.useCallback((selected = []) => {
    if (selected.length > 0) {
      viewModeHandlerRef.current?.enableFreeStyleSelect(true);
      editorRef.current?.setVisible(true);
      toolbarRef.current?.setVisible(false);
    } else {
      viewModeHandlerRef.current?.enableFreeStyleSelect(false);
      editorRef.current?.setVisible(false);
      editorRef.current?.setRotate(0);
      toolbarRef.current?.setVisible(true);
    }
  }, []);
  const tapDownListener = React.useCallback((selected = []) => {
    editorRef.current?.setVisible(false);
    toolbarRef.current?.setVisible(false);
    dispatch(setForceClosePopOver(Date.now()));
    dispatch(setIsShowSetting(false));
  }, []);

  const tapUpListener = React.useCallback((selected = []) => {
    mathEditorRef.current?.submit();

    // on select object created
    if (selected.length > 0) {
      editorRef.current?.setVisible(true);
      toolbarRef.current?.setVisible(false);
    } else {
      editorRef.current?.setVisible(false);
      toolbarRef.current?.setVisible(true);
    }
  }, []);

  const onFinishAutoDrawListener = (shapes) => {
    autoDrawRef.current.getNewShape(shapes);
  };

  const onFinishDrawListener = (object) => {
    // on create new object -> done draw
    // console.log("onFinishDrawListener", object);
    //
    // groupRef.current.addWithUpdate(object);
    // fabricRef.current.canvas.add(groupRef.current);
    // fabricRef.current?.setSelectObject(object);
  };

  const rotateGroupObjectListener = React.useCallback((radian) => {
    editorRef.current?.setRotate(parseInt(radian));
  }, []);

  const onObjectStateChangeListener = () => {
    saveBoardCanvas(fabricRef.current?.canvas?.toJSON(CUSTOM_EXPORT_FIELD));
  };

  // INIT
  useEffect(() => {
    if (!canvasRef.current) return;
    if (fabricRef.current) return;
    initFabric(
      fabricRef,
      transformListener,
      selectObjectListener,
      tapDownListener,
      tapUpListener,
      rotateGroupObjectListener,
      onFinishDrawListener,
      onObjectStateChangeListener,
      onFinishAutoDrawListener
    );
  }, []);

  React.useEffect(() => {
    dispatch(clearUndoRedo());
    dispatch(clearState());
    dispatch(setGlobalMounted(false));
    setTimeout(() => {
      dispatch(setGlobalMounted(true));
    }, 1000);
    return () => dispatch(clearUndoRedo());
  }, []);

  React.useEffect(() => {
    handleTrasnformBackground(DEFAULT_VIEW_PORT);
    handleScaleCursor(DEFAULT_VIEW_PORT, store);
  }, []);
  return (
    <div className="main__page">
      <LoadingOverlay />
      <Toolbar ref={toolbarRef} canvas={fabricRef} />
      <EditorBar ref={editorRef} canvas={fabricRef} />
      {/* <Pagination canvas={fabricRef} /> */}
      <ChangeViewModeHandler ref={viewModeHandlerRef} canvas={fabricRef} />
      <ChangeBrushStyleHandler canvas={fabricRef} />
      <MultipleTouchManagerHandler canvas={fabricRef} />
      <ContrastPenColorHandler />
      <CanvasBackground />
      <Header canvas={fabricRef} />
      {/* <AppLayout> */}
      <div
        className="canvas__container"
        style={
          locked
            ? {
                pointerEvents: "none",
              }
            : { zIndex: 10 }
        }
      >
        <canvas id="canvas" ref={canvasRef} />
      </div>
      {/* </AppLayout> */}
      {isHideAllUI ? <AppBubble canvas={fabricRef} /> : null}
      <EraserCustomCursor canvas={fabricRef} />

      <MathEditor ref={mathEditorRef} canvas={fabricRef} />
      <AppSetting canvas={fabricRef} />
      <OpenFileHandler />
      <CropImage canvas={fabricRef} />
      <RerenderBoardHandler canvas={fabricRef} />
      <AutoDraw canvas={fabricRef} ref={autoDrawRef} />
    </div>
  );
};

export default CanvasComponent;
