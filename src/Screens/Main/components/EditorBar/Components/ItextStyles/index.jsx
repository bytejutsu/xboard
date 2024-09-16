import "./styled.scss";

import React from "react";

// @Antd
import Tooltip from "antd/es/tooltip";
import Select from "antd/es/select";
import InputNumber from "antd/es/input-number";

// @Utils
import { getStringRGBA, preventInputString } from "@/utils/common";

// @Svg
import {
  AIcon,
  DownMiniIcon,
  HighLightITextIcon,
  UpMiniIcon,
} from "@/assets/svg";

import TBoardDraw from "@/Screens/Main/drawcore/TBoardDraw";
import CustomPopover from "../../../CustomPopover";
import ColorPickerPopup from "./ColorPickerPopup";

import * as rectColor from "react-color";
import FontFaceObserver from "fontfaceobserver";

import { FONTS } from "@/utils/constants";

const ItextStyles = () => {
  const [fontSize, setFontsize] = React.useState(10);
  const [color, setColor] = React.useState("#000");
  const [textBackgroundColor, setTextBackgroundColor] =
    React.useState(undefined);
  const [fontFamily, setFontFamily] = React.useState("");

  React.useEffect(() => {
    const objIText = getITextObj();

    if (objIText) {
      setFontsize(objIText.fontSize);
      setColor(objIText.fill);
      setTextBackgroundColor(objIText.textBackgroundColor);
      setFontFamily(objIText.fontFamily);
    }
  }, []);

  /**
   * @returns {fabric.IText | undefined }
   */
  function getITextObj() {
    const _this = TBoardDraw.getInstance();

    const selectedObj = _this.selectedObject?.[0];

    const obj = selectedObj.isType("IText") ? selectedObj : undefined;

    return obj;
  }

  /**
   * @param {number} value
   */
  const handleChangeFontSize = (value) => {
    const objIText = getITextObj();

    let intValue = value;
    intValue = intValue <= 10 ? 10 : intValue;
    intValue = intValue >= 64 ? 64 : intValue;

    setFontsize(intValue);
    objIText.set("fontSize", intValue);
    TBoardDraw.getInstance().canvas.renderAll();
  };

  /**
   * @param {rectColor.ColorResult['rgb']} value
   */
  const handleChangeColor = (value) => {
    const objIText = getITextObj();

    const rgba = getStringRGBA(value);

    setColor(rgba);
    objIText.set("fill", rgba);
    TBoardDraw.getInstance().canvas.renderAll();
  };

  /**
   * @param {rectColor.ColorResult['rgb']} value
   */
  const handleChangeTextBackgroundColor = (value) => {
    const objIText = getITextObj();

    const rgba = getStringRGBA(value);

    setTextBackgroundColor(rgba);
    objIText.set("textBackgroundColor", rgba);
    TBoardDraw.getInstance().canvas.renderAll();
  };

  const handleChangeFontFamily = (value) => {
    const objIText = getITextObj();

    const myfont = new FontFaceObserver(value);

    myfont
      .load()
      .then(function () {
        // when font is loaded, use it.
        objIText.set("fontFamily", value);
        TBoardDraw.getInstance().canvas.renderAll();
      })
      .catch(function (e) {
        console.log(e);
      });

    setFontFamily(value);
    objIText.set("fontFamily", value);

    TBoardDraw.getInstance().canvas.renderAll();
  };

  return (
    <React.Fragment>
      <Tooltip placement="top" arrow title={"Font family"}>
        <Select
          style={{ width: 150 }}
          onChange={handleChangeFontFamily}
          suffixIcon={<DownMiniIcon />}
          bordered
          options={FONTS}
          value={fontFamily}
        />
      </Tooltip>

      <div className="divider" />
      <Tooltip placement="top" arrow title={"Font size"}>
        <div className="editor__input">
          <InputNumber
            onKeyDown={preventInputString}
            className="editor__input-mask"
            min={10}
            max={64}
            controls={false}
            onChange={handleChangeFontSize}
            defaultValue={fontSize}
            value={fontSize}
          />
          <div className="editor__input-indicator">
            <div
              className="up-icon"
              onClick={() => handleChangeFontSize(fontSize + 1)}
            >
              <UpMiniIcon />
            </div>
            <div
              className="down-icon"
              onClick={() => handleChangeFontSize(fontSize - 1)}
            >
              <DownMiniIcon />
            </div>
          </div>
        </div>
      </Tooltip>

      <div className="divider" />
      <CustomPopover
        placement="topLeft"
        content={
          <ColorPickerPopup
            handleChangeColor={handleChangeColor}
            defaultValue={color}
          />
        }
        trigger="click"
        overlayClassName="color-popup"
      >
        <Tooltip title={"Text color"} placement="top" arrow>
          <div className="IText-color">
            <AIcon />
            <div
              className="divider-color"
              style={{
                background: color,
              }}
            />
          </div>
        </Tooltip>
      </CustomPopover>

      <div className="divider" />
      <CustomPopover
        placement="topLeft"
        content={
          <ColorPickerPopup
            handleChangeColor={handleChangeTextBackgroundColor}
            defaultValue={textBackgroundColor}
          />
        }
        trigger="click"
        overlayClassName="color-popup"
      >
        <Tooltip title={"HighLight text"} placement="top" arrow>
          <div className="IText-color">
            <HighLightITextIcon />
            <div
              className="divider-color"
              style={{
                background: textBackgroundColor
                  ? textBackgroundColor
                  : "linear-gradient(to right, #B3B3B3 0 25%, #E6E6E6 25% 50%, #B3B3B3 50% 75%, #E6E6E6 75% 100%)",
              }}
            />
          </div>
        </Tooltip>
      </CustomPopover>
      <div className="divider" />
    </React.Fragment>
  );
};

export default ItextStyles;
