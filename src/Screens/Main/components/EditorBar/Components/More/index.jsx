import React from "react";

// @Antd
import Tooltip from "antd/es/tooltip";

// @Utils
import CustomPopover from "../../../CustomPopover";

// @Svg
import { MoreIcon } from "@/assets/svg";
import PopoverMore from "./PopoverMore";

const More = () => {
  const popRef = React.useRef();

  return (
    <Tooltip placement="top" arrow title={"More"}>
      <CustomPopover
        ref={popRef}
        align={{ offset: [17, -6] }}
        placement="rightTop"
        arrow={false}
        content={
          <PopoverMore onClickItem={() => popRef.current.setOpen(false)} />
        }
        trigger="click"
        overlayClassName="color-popup"
      >
        <div className="btn-label pointer">
          <MoreIcon />
        </div>
      </CustomPopover>
    </Tooltip>
  );
};

export default More;
