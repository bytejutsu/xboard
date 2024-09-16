import React, { useState } from "react";
//COMPONENT
import { Popover, Slider } from "antd";
import { ChromePicker } from "react-color";

//ASSETES

import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { getListSavedColorSelector } from "@Store/draw/selectors";
import { setBrushColor, setListSavedColor } from "@Store/draw";

export default function ColorPickerPopup() {
  const dispatch = useDispatch();

  const [activeColor, setActiveColor] = useState("red");
  const listSavedColor = useSelector(getListSavedColorSelector);

  const getColorString = (color) => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
  const isSameColor = (color1, color2) => {
    return (
      color1.r === color2.r &&
      color1.g === color2.g &&
      color1.b === color2.b &&
      color1.a === color2.a
    );
  };

  const activeColorExistInList =
    listSavedColor.filter((item) => isSameColor(item, activeColor)).length !==
    0;

  const onAddColor = () => {
    dispatch(setListSavedColor([...listSavedColor, activeColor]));
  };
  const onDeleteColor = () => {
    dispatch(
      setListSavedColor(
        [...listSavedColor].filter((item) => !isSameColor(item, activeColor))
      )
    );
  };

  const saveBrushColor = (c) => {
    dispatch(setBrushColor(c));
  };

  return (
    <div className="color-config__popup">
      <div className="color-picker__container">
        <ChromePicker
          color={activeColor}
          onChangeComplete={(c) => {
            setActiveColor(c.rgb);
            saveBrushColor(c.rgb);
          }}
        />
      </div>
      <div className="color-divider"></div>
      <div className="saved-color__container">
        <div className="d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="label">Libraries</div>
          {activeColorExistInList ? (
            <div
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteColor();
              }}
            >
              <DeleteOutlined color="red" />
            </div>
          ) : null}
        </div>
        <div className="list-color__container d-flex flex-row flex-wrap">
          {listSavedColor.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveColor(item);
                  saveBrushColor(item);
                }}
                className={
                  "color__preview " +
                  (isSameColor(item, activeColor) ? "active" : "")
                }
              >
                <div
                  style={{
                    backgroundColor: getColorString(item),
                  }}
                  className="color__inner"
                ></div>
              </div>
            );
          })}
          <div
            onClick={activeColorExistInList ? () => {} : onAddColor}
            className={"color__preview "}
            style={{
              cursor: activeColorExistInList ? "not-allowed" : "pointer",
            }}
          >
            <div className="add-color-btn">
              <PlusOutlined color="#999" size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
