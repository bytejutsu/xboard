import React, { useState } from "react";

import "./styles/index.scss";
import {
  EraserButton,
  ChoosePencilTypeButton,
  SelectAreaPencil,
  ColorPicker,
  DragPannelButton,
  ImagePicker,
  CleanButton,
  HideUiButton,
  CreateBoardButton,
  ShapePicker,
  MathButton,
  BackgroundSettingButton,
  AppSettingButton,
  ChoosePencilTypeConfigPopup,
  PencilConfigPopup,
} from "./Components";
import Tooltip from "antd/es/tooltip";

import TBoardDraw, { BRUSH_TYPE } from "../../drawcore/TBoardDraw";
import ButtonIcon from "@Components/ButtonIcon";
import { CUSTOM_EXPORT_FIELD, TOOLBAR_ELEMENTS } from "@Main/constants";
import { useDispatch, useSelector } from "react-redux";

import useToggleMode from "@Hooks/useToggleMode";
import {
  setForceClosePopOver,
  setIsShowSetting,
  setOpenMathEditor,
  setBrushColor,
  setBrushType,
  setLocked,
} from "@Store/draw";
import { setToolToShow } from "@Store/board";
import {
  getBoardLockedSelector,
  getIsShowSettingSelector,
  getOpenMathEditorSelector,
  getBrushTypeSelector,
} from "@Store/draw/selectors";
import {
  getCurrentBoardIdSelector,
  canUnDoRedoSelector,
  getToolToShowSelector,
  getBoardPaginationSelector,
} from "@Store/board/selectors";
import OnDevelopButton from "./Components/OnDevelopButton";

// utils
import { HEIGHT_HEADER, MAX_ZOOM, MINIMUM_ZOOM } from "@/utils/constants";
import {
  CircleQuestionIcon,
  FrameIcon,
  MinusIcon,
  NoteIcon,
  PlusFilledIcon,
  PlusIcon,
  RedoIcon,
  TIcon,
  UndoIcon,
  LockedIcon,
  UnLockedIcon,
  FitContentIcon,
  TrashIcon,
} from "@/assets/svg";
import useBoardManager from "@Hooks/useBoardManager";

import { fabric } from "fabric";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const Toolbar = ({ canvas }, ref) => {
  const dispatch = useDispatch();
  const locked = useSelector(getBoardLockedSelector);
  const currentBoard = useSelector(getCurrentBoardIdSelector);
  const pagination = useSelector(getBoardPaginationSelector);

  const openMathEditor = useSelector(getOpenMathEditorSelector);
  const isShowSetting = useSelector(getIsShowSettingSelector);
  const canUndoRedo = useSelector(canUnDoRedoSelector);
  const {
    isDrawMode,
    toggleDrawMode,
    isSelectMode,
    toggleSelectMode,
    isAutoDrawMode,
    toggleAutoDrawMode,
    toggleViewMode,
  } = useToggleMode();

  const { handleRedo, handleUndo, goToBoard, saveBoardCanvas, deleteBoard } =
    useBoardManager();

  const [showPencilConfig, setShowPencilConfig] = useState(false);
  const [showPencilTypeConfig, setShowPencilTypeConfig] = useState(false);
  const [percentZoom, setPercentZoom] = useState(1);

  const toolToShow = useSelector(getToolToShowSelector);

  const brushType = useSelector(getBrushTypeSelector);

  const toolbarRef = React.useRef();

  React.useEffect(() => {
    dispatch(setToolToShow(TOOLBAR_ELEMENTS));

    /**
     * @param {fabric.Canvas['viewportTransform']} viewport
     */
    const transformListener = (viewport) => {
      const _this = TBoardDraw.getInstance();

      const percent = _this.calcPercentZoom();

      setPercentZoom(percent);
    };

    transformListener();

    TBoardDraw.getInstance().subscribe({
      name: "transformListener",
      func: transformListener,
    });

    return () => {
      TBoardDraw.getInstance().unsubscribe({
        name: "transformListener",
        transformListener,
      });
    };
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      setVisible: () => setShowPencilTypeConfig(false),
    };
  });

  React.useEffect(() => {
    /**
     * Prevent event wheel of window can't be zoom
     * @param {WheelEvent} e
     */
    const handle = (e) => {
      e.stopPropagation();
      e.preventDefault();
    };

    if (locked) {
      window.document.addEventListener("wheel", handle, {
        passive: false, // Add this
      });
    }

    return () => {
      window.document.removeEventListener("wheel", handle);
    };
  }, [locked]);

  const toggleLocked = () => {
    dispatch(setLocked(!locked));
  };

  const handleSave = () => {
    saveBoardCanvas(
      TBoardDraw.getInstance().canvas?.toJSON(CUSTOM_EXPORT_FIELD)
    );
  };

  const onChangeBrushType = (type) => {
    if (!isDrawMode) {
      toggleDrawMode();
    }
    dispatch(setBrushType(type));
  };

  const renderTool = ({ id, label }) => {
    switch (id) {
      case "FRAME":
        return (
          <ButtonIcon title={label}>
            <FrameIcon />
          </ButtonIcon>
        );
      case "PENCIL":
        return (
          <ChoosePencilTypeButton
            key={id}
            title={label}
            active={
              isDrawMode &&
              ![BRUSH_TYPE.ERASER_DEF, BRUSH_TYPE.ERASER_GROUP].includes(
                brushType
              )
            }
            onClick={() => {
              setShowPencilTypeConfig(!showPencilTypeConfig);
              if (!isDrawMode) {
                toggleDrawMode(false);
              } else if (
                [BRUSH_TYPE.ERASER_DEF, BRUSH_TYPE.ERASER_GROUP].includes(
                  brushType
                )
              ) {
                onChangeBrushType(BRUSH_TYPE.PENCIL);
              }
            }}
          />
        );
      case "ERASER":
        return (
          <EraserButton
            canvas={canvas}
            key={id}
            title={label}
            active={
              (brushType === BRUSH_TYPE.ERASER_DEF ||
                brushType === BRUSH_TYPE.ERASER_GROUP) &&
              isDrawMode
            }
            onClick={() => {
              onChangeBrushType(BRUSH_TYPE.ERASER_DEF);
            }}
          />
        );

      case "ADD_TEXT":
        return (
          <ButtonIcon
            onClick={() => {
              toggleViewMode(true);
              canvas.current.addTextField();
            }}
            title={label}
          >
            <TIcon />
          </ButtonIcon>
        );
      case "NOTE":
        return (
          <ButtonIcon title={label}>
            <NoteIcon />
          </ButtonIcon>
        );
      case "MATH":
        return (
          <ButtonIcon title={label}>
            <MathButton key={id} />
          </ButtonIcon>
        );
      case "SHAPE":
        return (
          <ButtonIcon title={label}>
            <ShapePicker key={id} canvas={canvas} />
          </ButtonIcon>
        );

      case "IMAGE":
        return (
          <ButtonIcon title={label}>
            <ImagePicker key={id} canvas={canvas} />
          </ButtonIcon>
        );

      default:
        return null;
    }
  };

  const handlePlusZoom = () => {
    const _this = TBoardDraw.getInstance();
    const zoom = _this.canvas.getZoom();

    if (zoom >= MAX_ZOOM) return;

    const d = zoom / MAX_ZOOM <= 0.25 ? 1 : 1.6 + zoom / MAX_ZOOM;
    const zoomCalc = MAX_ZOOM * 0.1 * d + zoom,
      finalZoom = zoomCalc >= MAX_ZOOM ? MAX_ZOOM : zoomCalc;

    const point = new fabric.Point(
      _this.canvas.width / 2,
      _this.canvas.height / 2
    );

    _this.animateZoomToPoint(finalZoom, point);
  };

  const handleMinusZoom = () => {
    const _this = TBoardDraw.getInstance();
    const zoom = _this.canvas.getZoom();

    if (zoom <= MINIMUM_ZOOM) return;

    const d = zoom / MAX_ZOOM <= 0.25 ? 1 : 1.6 + zoom / MAX_ZOOM;
    const zoomCalc = zoom === 1 ? MINIMUM_ZOOM : zoom - MAX_ZOOM * 0.1 * d,
      finalZoom = zoomCalc <= MINIMUM_ZOOM ? MINIMUM_ZOOM : zoomCalc;

    const point = new fabric.Point(
      _this.canvas.width / 2,
      _this.canvas.height / 2
    );

    _this.animateZoomToPoint(finalZoom, point);
  };

  const zoomToDefault = () => {
    const _this = TBoardDraw.getInstance();
    const point = new fabric.Point(
      _this.canvas.width / 2,
      _this.canvas.height / 2
    );

    _this.animateZoomToPoint(1, point);
  };

  const handleFitToScreen = () => {
    TBoardDraw.getInstance().animateZoomFitContent();
  };
  const handleDelete = () => {
    if (confirm("Are you sure to delete this board?")) {
      deleteBoard();
    }
  };
  const sorted = toolToShow;

  return (
    <div className={"draggable-wrapper__container "}>
      <div
        ref={toolbarRef}
        style={locked ? { pointerEvents: "none" } : null}
        className={"toolbar__container"}
      >
        <div className="list__wrapper">
          <DragPannelButton />

          {toolToShow?.map((item) => (
            <React.Fragment key={item.id}>{renderTool(item)}</React.Fragment>
          ))}
          <ButtonIcon title={"Delete"} onClick={handleDelete}>
            <TrashIcon />
          </ButtonIcon>
          <ButtonIcon title={"Create New Board"}>
            <CreateBoardButton canvas={canvas} />
          </ButtonIcon>
        </div>

        <div className="list__wrapper mt-5">
          <ButtonIcon
            disabled={!canUndoRedo?.canUndo}
            title={"Undo"}
            onClick={handleUndo}
          >
            <UndoIcon />
          </ButtonIcon>
          <ButtonIcon
            disabled={!canUndoRedo?.canRedo}
            title={"Redo"}
            onClick={handleRedo}
          >
            <RedoIcon />
          </ButtonIcon>
        </div>
      </div>
      {showPencilTypeConfig && (
        <ChoosePencilTypeConfigPopup
          setShowPencilTypeConfig={setShowPencilTypeConfig}
          setShowPencilConfig={setShowPencilConfig}
          showPencilConfig={showPencilConfig}
        />
      )}

      <motion.div
        className="toolbar-zoom"
        whileHover={{
          width: "auto",
          transition: { duration: 0.32, ease: "linear" },
        }}
      >
        <ButtonIcon
          onClick={() => {
            if (!currentBoard) {
              return;
            }
            goToBoard(-1);
          }}
        >
          <CaretLeftOutlined />
        </ButtonIcon>
        <ButtonIcon style={{ width: "auto", paddingInline: 8 }}>
          {pagination.current} / {pagination.total}
        </ButtonIcon>
        <ButtonIcon
          onClick={() => {
            if (!currentBoard) {
              return;
            }
            goToBoard(1);
          }}
        >
          <CaretRightOutlined />
        </ButtonIcon>

        <ButtonIcon
          title={"Fit to screen"}
          placement="top"
          disabled={locked}
          onClick={handleFitToScreen}
        >
          <FitContentIcon />
        </ButtonIcon>
        <ButtonIcon
          title={"Zoom out"}
          placement="top"
          disabled={locked || percentZoom === 1}
          onClick={handleMinusZoom}
        >
          <MinusIcon />
        </ButtonIcon>
        <ButtonIcon
          disabled={locked}
          style={{ fontSize: 12 }}
          onClick={zoomToDefault}
          title={"Zoom to 25%"}
          placement="top"
        >
          <motion.span>{`${percentZoom}%`}</motion.span>
        </ButtonIcon>
        <ButtonIcon
          title={"Zoom in"}
          placement="top"
          disabled={locked || percentZoom === 100}
          onClick={handlePlusZoom}
        >
          <PlusIcon />
        </ButtonIcon>
        <ButtonIcon
          onClick={toggleLocked}
          title={locked ? "Unlock" : "Lock"}
          placement="top"
        >
          {locked ? <LockedIcon /> : <UnLockedIcon />}
        </ButtonIcon>
      </motion.div>
    </div>
  );
};
export default React.forwardRef(Toolbar);
