import React, { useState } from "react";

import "./styles/index.scss";
import { ColorPicker } from "./Components";

import { useDispatch, useSelector } from "react-redux";

import Draggable from "react-draggable";

// @antd
import Tooltip from "antd/es/tooltip";
import InputNumber from "antd/es/input-number";
import Space from "antd/es/space";

import {
  caculateDragAreaLayout,
  getToolbarLayoutDim,
} from "../../../../utils/layout";
import { DragOutlined } from "@ant-design/icons";
import { setForceClosePopOver, setOpenMathEditor } from "@Store/draw";
import { getBoardLockedSelector } from "@Store/draw/selectors";
import OnScreenKeyboard from "../../../../Components/OnScreenKeyboard";
import TBoardDraw from "../../drawcore/TBoardDraw";
import { DownMiniIcon, UpMiniIcon } from "@/assets/svg";
import ItextStyles from "./Components/ItextStyles";
import Rotate from "./Components/Rotate";
import More from "./Components/More";

const EditorBar = ({ canvas }, ref) => {
  const dispatch = useDispatch();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const locked = useSelector(getBoardLockedSelector);

  const [visible, setVisible] = useState(false);
  const [rotate, setRotate] = useState(0);

  const [showKeyboard, setShowKeyboard] = useState(false);
  const keyboardRef = React.useRef();

  const layoutRef = React.useRef();

  const toolbarRef = React.useRef();
  const keyboardHeight =
    Math.min(Math.max(600, window.screen.width * 0.6), 900) / 3.2;
  const getToolbarDim = () => {
    return toolbarRef.current?.getBoundingClientRect();
  };

  // const rotateObjectCanvas = (radian) => {
  //   canvas.current.rotatingObject?._setOriginToCenter();
  //   canvas.current.rotatingObject.angle = radian;
  //   canvas.current?.canvas.renderAll();
  // };
  const setToolbarPositionByArea = (area = "bottom") => {
    const { width, height } = getToolbarDim();

    const { x, y } = getToolbarLayoutDim(80, width, "bottom");
    setPosition({ x, y: window.screen.height - keyboardHeight - 80 });
  };
  // const changeRotateValue = (e) => {
  //   // if (e.target.value > 359 || e.target.value < 0) {
  //   //   return
  //   // }
  //   if (!e.target.value) {
  //     setRotate(0);
  //     rotateObjectCanvas(0);
  //     keyboardRef.current?.setKeyboardValue(``);
  //     return;
  //   }
  //   if (e.target.value.match(/^[0-9]+$/)) {
  //     setRotate(parseInt(e.target.value));
  //     rotateObjectCanvas(parseInt(e.target.value));
  //   }
  // };

  const showUpdateButton =
    canvas.current?.selectedObject?.length === 1 &&
    !!canvas.current?.selectedObject?.[0]?.mathData?.id;
  const showChangeColorButton = !canvas.current?.selectedObject?.some(
    (item) => item?.imageData?.id || item.isType("IText") || item?.shapeData?.id
  );

  const showMathEditor = React.useCallback(() => {
    dispatch(setOpenMathEditor(true));
  }, []);

  /**
   * @param {fabric.IText} object
   * @returns {fabric.IText}
   */
  const getITextCurr = () => {
    return canvas?.current?.selectedObject[0];
  };

  React.useEffect(() => {
    layoutRef.current = caculateDragAreaLayout();
    setToolbarPositionByArea();
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      setVisible,
      setRotate,
    };
  });

  React.useEffect(() => {
    if (visible) {
      setRotate(parseInt(canvas.current.rotatingObject.angle) || 0);
      keyboardRef.current?.setKeyboardValue(
        `${canvas.current.rotatingObject.angle || ""}`
      );
    } else {
      setShowKeyboard(false);
    }
  }, [visible]);

  React.useEffect(() => {
    TBoardDraw.getInstance().subscribe({
      name: "mathdoubleclick",
      func: showMathEditor,
    });

    return () => {
      TBoardDraw.getInstance().unsubscribe({
        name: "mathdoubleclick",
        showMathEditor,
      });
    };
  }, []);

  return (
    <div
      className={
        "editor-draggable-wrapper__container " + (isDragging ? "dragging" : "")
      }
    >
      <Draggable
        handle=".handle"
        onStart={() => {
          setIsDragging(true);
          dispatch(setForceClosePopOver(Date.now()));
        }}
        onStop={() => {
          setIsDragging(false);
        }}
        position={position}
        onDrag={(e, pos) => {
          if (pos.y > window.screen.height - keyboardHeight - 80) {
            return;
          }
          setPosition({
            x: pos.x,
            y: pos.y,
          });
        }}
      >
        <div
          ref={toolbarRef}
          style={locked ? { pointerEvents: "none" } : null}
          className={"editorbar__container " + (!visible ? "hide" : "")}
        >
          {/* {!!canvas?.current?.selectedObject.length && <Rotate />} */}

          {showUpdateButton ? (
            <React.Fragment>
              <div
                className="btn-label pointer"
                onClick={() => {
                  showMathEditor();
                  setShowKeyboard(false);
                }}
              >
                Edit
              </div>
              <div className="divider" />
            </React.Fragment>
          ) : null}

          {showChangeColorButton && (
            <React.Fragment>
              <ColorPicker
                handleChangeColor={(color) => {
                  canvas.current?.changeObjectColor(color);
                }}
              />
              <div className="divider" />
            </React.Fragment>
          )}

          {!!canvas?.current?.selectedObject.length &&
            canvas?.current?.selectedObject?.[0].isType("IText") && (
              <ItextStyles />
            )}
          <More />
          <div className="divider" />
          <div
            className="handle"
            style={{
              height: "80%",
              aspectRatio: 0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DragOutlined />
          </div>
        </div>
      </Draggable>
      {/* {!!showOnscreenKeyboard && ( */}
      {/* <OnScreenKeyboard
        ref={keyboardRef}
        hasNumberInputMask={true}
        inputMaskTargetClass="editor__input-mask"
        show={showKeyboard}
        onChange={(value) => {
          changeRotateValue({
            target: {
              value: value.replace(/\D/g, ""),
            },
          })
        }}
      /> */}
      {/* )} */}
    </div>
  );
};
export default React.forwardRef(EditorBar);
