import "./styled.scss";

import React from "react";
import classNames from "classnames";

import Tooltip from "antd/es/tooltip";

const ButtonIcon = ({
  title,
  placement = "right",
  children,
  icon,
  active = false,
  onClick = () => {},
  disabled = false,
  ...rest
}) => {
  return (
    <Tooltip
      popupVisible={!!title}
      showArrow
      title={title}
      placement={placement}
    >
      <div
        className={classNames("button-icon", {
          active: active,
          disabled: disabled,
        })}
        onClick={!disabled ? onClick : undefined}
        {...rest}
      >
        {children || icon}
      </div>
    </Tooltip>
  );
};

export default ButtonIcon;
