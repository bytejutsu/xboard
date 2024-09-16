import React, { useState } from "react";
//COMPONENT
import { Popover, Slider } from "antd";
import { ChromePicker } from "react-color";
import ColorPickerPopup from "./ColorPickerPopup";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { getListSavedColorSelector } from "@Store/draw/selectors";
import {
  setBrushColor,
  setForceClosePopOver,
  setListSavedColor,
} from "@Store/draw";
//ASSETES
import WhitePage from "@assets/images/PageBackground/white.png";
import BlackPage from "@assets/images/PageBackground/black.png";
import GreenPage from "@assets/images/PageBackground/green.png";
import TransparentPage from "@assets/images/PageBackground/transp.png";
import ImagePage from "@assets/images/PageBackground/image.png";

import DotPage from "@assets/images/PageBackground/dot.png";
import LinePage from "@assets/images/PageBackground/line.png";
import CaroPage from "@assets/images/PageBackground/caro.png";
import ColorPickImage from "@assets/images/color-picker.png";

import { BOARD_BACKGROUND_TYPE } from "@constants";
import useBoardManager from "@Hooks/useBoardManager";
import CustomPopover from "../../../CustomPopover";
import { colorObjectToRGBAString } from "@utils/color";

const OPT1 = [
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "#ffffff",
    image: WhitePage,
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "#108804",
    image: GreenPage,
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "#000000",
    image: BlackPage,
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "#FFFFFF00",
    image: TransparentPage,
  },
  // {
  //   type: BOARD_BACKGROUND_TYPE.IMAGE,
  //   color: "#FFFFFF00",
  //   image: ImagePage,
  // },
];

const OPT2 = [
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "#ffffff",
  },
  {
    type: BOARD_BACKGROUND_TYPE.DOT,
    color: "#ffffff",
    image: DotPage,
  },
  {
    type: BOARD_BACKGROUND_TYPE.LINE,
    color: "#ffffff",
    image: LinePage,
  },
  {
    type: BOARD_BACKGROUND_TYPE.GRID,
    color: "#FFFFFF",
    image: CaroPage,
  },
];
const OPT3 = [
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(255, 255, 255)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(242, 242, 242)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(102, 102, 102)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(46, 46, 46)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(0, 0, 0)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(231, 247, 253)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(230, 234, 254)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(240, 232, 243)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(249, 227, 230)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(252, 246, 220)",
  },
  {
    type: BOARD_BACKGROUND_TYPE.SOLID,
    color: "rgb(236, 245, 229)",
  },
];

export default function BackgroundSettingPopup({ handleSave = () => {} }) {
  const dispatch = useDispatch();
  const { createBoard } = useBoardManager();

  const closePopup = () => {
    dispatch(setForceClosePopOver(Date.now()));
  };
  return (
    <div className="background-config__popup">
      <div className="label">Pattern</div>
      <div className="list-default-pattern d-flex flex-row flex-wrap">
        {OPT2.map((item, index) => (
          <div
            key={index}
            className="list-item"
            onClick={() => {
              handleSave();
              createBoard(item.type, item.color, null);
              closePopup();
            }}
          >
            {item.image ? <img src={item.image} /> : null}
          </div>
        ))}
      </div>
      <div className="label">Background</div>
      <div className="list-default-color d-flex flex-row flex-wrap">
        {OPT3.map((item, index) => (
          <div key={index} className="list-item">
            {item.image ? (
              <CustomPopover
                placement="topRight"
                trigger="click"
                overlayClassName="color-popup"
                content={
                  <ColorPickerPopup
                    onSubmit={(color) => {
                      handleSave();
                      createBoard(BOARD_BACKGROUND_TYPE.SOLID, color, null);
                      closePopup();
                    }}
                  />
                }
              >
                <img src={item.image} />
              </CustomPopover>
            ) : (
              <div
                onClick={() => {
                  handleSave();
                  createBoard(BOARD_BACKGROUND_TYPE.SOLID, item.color, null);
                  closePopup();
                }}
                className="list-item__inner"
                style={{ backgroundColor: item.color }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
