import React from "react";
import { Popover } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getBoardLockedSelector,
  getForceClosePopOverSelector,
} from "../../../Store/draw/selectors";

export default React.forwardRef(function CustomPopover(
  { children, ...props },
  ref
) {
  const [open, setOpen] = useState(false);
  const popRef = React.useRef();
  const locked = useSelector(getBoardLockedSelector);

  const forceClose = useSelector(getForceClosePopOverSelector);

  React.useEffect(() => {
    if (open && (forceClose || locked)) {
      setOpen(false);
    }
  }, [forceClose, locked]);

  React.useImperativeHandle(
    ref,
    () => {
      return { setOpen };
    },
    []
  );

  return (
    <Popover
      ref={popRef}
      arrow={{ pointAtCenter: true }}
      {...props}
      trigger={"click"}
      destroyTooltipOnHide
      open={open}
      onOpenChange={(v) => setOpen(v)}
    >
      {children}
    </Popover>
  );
});
