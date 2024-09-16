import React from "react";

// @Antd
import Tooltip from "antd/es/tooltip";
import Space from "antd/es/space";
import InputNumber from "antd/es/input-number";

// @Utils
import { preventInputString } from "@/utils/common";

import TBoardDraw from "@/Screens/Main/drawcore/TBoardDraw";

const Rotate = () => {
  const [rotate, setRotate] = React.useState(0);

  const object = getObjectActived();

  React.useEffect(() => {
    const object = getObjectActived();
    if (object) {
      setRotate(object.angle);
    }
  }, []);

  /**
   * @param {number} value
   */
  const handleChange = (value) => {
    setRotate(value);
    TBoardDraw.getInstance().rotateObject(object, value);
  };

  /**
   * @returns {fabric.Object | undefined}
   */
  function getObjectActived() {
    const obj = TBoardDraw.getInstance().canvas.getActiveObject();

    return obj;
  }

  return (
    <React.Fragment>
      <Tooltip placement="top" arrow title={"Rotate"}>
        <Space direction="row" align={"center"} size={8}>
          <div className="btn-label">Rotate</div>
          <div className="editor__input">
            <InputNumber
              onKeyDown={preventInputString}
              className="editor__input-mask"
              // onFocus={() => {
              //   if (!visible) {
              //     return;
              //   }
              //   setShowKeyboard(true);
              //   keyboardRef.current?.setKeyboardValue(
              //     rotate === 0 ? "" : rotate + ""
              //   );
              // }}
              // min={0}
              // max={999}
              controls={false}
              maxLength={4}
              onChange={handleChange}
              defaultValue={rotate}
              value={rotate}
              formatter={(value) => `${value} ${String.fromCharCode(176)}`}
            />
          </div>
        </Space>
      </Tooltip>
    </React.Fragment>
  );
};

export default Rotate;
