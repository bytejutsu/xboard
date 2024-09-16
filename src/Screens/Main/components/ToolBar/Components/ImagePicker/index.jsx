import React from "react";
//COMPONENT
import { Popover } from "antd";

//ASSest
import IconImage from "@assets/images/pick-image.png";
import useToggleMode from "@Hooks/useToggleMode";
import classNames from "classnames";
import { ImageIcon } from "@assets/svg";

export default function ImagePicker({ canvas, rotate, rotateLeft }) {
  const idxRef = React.useRef(0);
  const { toggleViewMode } = useToggleMode();
  const handleFileChange = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      let imageSrc = event.target.result;
      canvas.current?.addImageToBoard(imageSrc, false, 4, idxRef.current);
      e.target.value = "";
      toggleViewMode(true);

      if (idxRef.current > 6) {
        idxRef.current = -1;
        return;
      }
      if (idxRef.current < -6) {
        idxRef.current = 1;
        return;
      }
      if (idxRef.current >= 0) {
        idxRef.current++;
      } else {
        idxRef.current--;
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={classNames("button-toolbar", {
        "rotate-left": rotateLeft && rotate,
        rotate: rotate,
      })}
    >
      <input
        onChange={handleFileChange}
        multiple={false}
        type="file"
        accept="image/*"
        onClick={() => console.log("image")}
      />
      <ImageIcon />
    </div>
  );
}
