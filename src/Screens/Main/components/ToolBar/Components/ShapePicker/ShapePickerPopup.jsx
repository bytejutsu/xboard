import React from "react";
//COMPONENT

//ASSETES
import { ShapesString } from "../../../../constants/shapeString";

export default function ShapePickerPopup({ handleAddShape = () => {} }) {
  return (
    <div className="shape-config__popup">
      <div className="shape__list">
        {ShapesString.map((item, index) => {
          return (
            <div
              onClick={() => handleAddShape(item)}
              className="shape__item"
              key={index}
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
