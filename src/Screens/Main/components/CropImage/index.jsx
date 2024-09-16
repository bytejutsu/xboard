import React from "react";
import Cropper from "react-cropper";

//STYLE
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getImageCropSrcSelector } from "@Store/draw/selectors";
import { setImageCropSrc } from "@Store/draw";
import useToggleMode from "@Hooks/useToggleMode";

function CropImage({ canvas }) {
  const dispatch = useDispatch();
  const imageCropSrc = useSelector(getImageCropSrcSelector);
  const cropperRef = React.useRef(null);
  const { toggleViewMode } = useToggleMode();

  const onCancel = () => {
    dispatch(setImageCropSrc(null));
  };
  const onOk = () => {
    const base64 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    canvas.current?.addImageToBoard(base64, false, 3);
    dispatch(setImageCropSrc(null));
    toggleViewMode(true);
  };

  return (
    <div
      style={{
        width: window.screen.width,
        height: window.screen.height,
      }}
      className={"crop-modal__container " + (imageCropSrc ? "show" : "")}
    >
      <div className="content">
        <Cropper
          src={imageCropSrc}
          style={{
            height: window.screen.height,
            width: window.screen.width,
          }}
          guides={false}
          ref={cropperRef}
        />
        <div onClick={onOk} className="accept-btn">
          Đồng ý
        </div>
        <div onClick={onCancel} className="cancel-btn">
          Huỷ
        </div>
      </div>
    </div>
  );
}

export default CropImage;
