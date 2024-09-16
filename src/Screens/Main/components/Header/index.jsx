import React from "react";
import "./styles.scss";
import { BackgroundSettingButton } from "../ToolBar/Components";
import { ExportIcon, MainLogo } from "@assets/svg";
import { getCurrentBoardDataSelector } from "@Store/board/selectors";
import equal from "fast-deep-equal";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

function Header({ canvas }) {
  const boardData = useSelector(getCurrentBoardDataSelector, (prev, next) => {
    const prevProps = {
      type: prev?.backgroundType,
      color: prev?.backgroundColor,
      image: prev?.backgroundImage,
    };
    const nextProps = {
      type: next?.backgroundType,
      color: next?.backgroundColor,
      image: next?.backgroundImage,
    };
    return equal(prevProps, nextProps);
  });
  const downloadImage = () => {
    let a = document.createElement("a");
    canvas.current.canvas.backgroundColor = boardData?.backgroundColor;
    let dt = canvas.current.canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    dt = dt.replace(/^data:image\/[^;]*/, "data:application/octet-stream");
    dt = dt.replace(
      /^data:application\/octet-stream/,
      "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"
    );
    a.href = dt;
    a.download = "canvas.png";
    a.click();
    a.remove();
    canvas.current.canvas.backgroundColor = "transparent";
  };
  return (
    <div className="header__container">
      <div className="logo-wrapper">
        <MainLogo />
      </div>
      <div className="divider" />
      <BackgroundSettingButton canvas={canvas} />
      <Tooltip title="Export">
        <div className="export-btn" onClick={downloadImage}>
          <ExportIcon />
        </div>
      </Tooltip>
    </div>
  );
}

export default Header;
