import React from "react";
//ELECTRON

//ASSest
import IconEye from "@assets/images/eyeclose.png";
import IconPen from "@assets/images/pen1.png";
import IconScreenShot from "@assets/images/screen-shot.png";
import { useDispatch } from "react-redux";
//STORE

import useToggleMode from "@Hooks/useToggleMode";
import { setImageCropSrc, setHideUI } from "../../../Store/draw";
//STYKE
import "./common.scss";
import useBoardManager from "@Hooks/useBoardManager";
import { BOARD_BACKGROUND_TYPE } from "@constants";
import { CUSTOM_EXPORT_FIELD } from "../constants";

export default function AppBubble({ canvas }) {
  const dispatch = useDispatch();
  const { toggleViewMode, toggleDrawMode } = useToggleMode();
  const { createBoard, saveBoardCanvas } = useBoardManager();

  const isScropRef = React.useRef(false);
  const handleShow = () => {
    dispatch(setHideUI(false));
    document.body.style = null;
  };

  const handleCapture = (isCrop = false) => {
    isScropRef.current = isCrop;
  };
  const handleShotSuccess = React.useCallback(async (e, source) => {
    handleShow();
    if (isScropRef.current) {
      toggleViewMode(true);
      dispatch(setImageCropSrc(source));
      isScropRef.current = false;
    } else {
      saveBoardCanvas(canvas.current?.canvas?.toJSON(CUSTOM_EXPORT_FIELD));
      canvas.current?.clearCanvas();
      toggleDrawMode();
      createBoard(BOARD_BACKGROUND_TYPE.IMAGE, "#fff", source);
    }
  }, []);

  React.useEffect(() => {}, []);
  return (
    <div
      className="drag-zone"
      style={{
        width: 200,
        height: 80,
        padding: 10,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "white",
        zIndex: 9999,
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <div
        className="no-drag-button"
        onClick={handleShow}
        style={{
          height: "80%",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          src={IconEye}
          style={{
            flex: 1,
            objectFit: "contain",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
      <div
        className="no-drag-button"
        onClick={() => handleCapture()}
        style={{
          height: "80%",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          src={IconPen}
          style={{
            flex: 1,
            objectFit: "contain",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
      <div
        className="no-drag-button"
        onClick={() => handleCapture(true)}
        style={{
          height: "80%",
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          src={IconScreenShot}
          style={{
            flex: 1,
            objectFit: "contain",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      </div>
    </div>
  );
}
