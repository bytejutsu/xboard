import React from "react";
import { useSelector } from "react-redux";
import { getGlobalMountedSelector } from "@Store/draw/selectors";
import "./styles.scss";
export default function LoadingOverlay() {
  const mounted = useSelector(getGlobalMountedSelector);
  return (
    <div className={"app-loading-wrap " + (mounted ? "hide" : "")}>
      <div className="line">
        <div className="pen">
          <div className="pen_overlay"></div>
          <div className="pen_top"></div>
          <div className="pen_bottom"></div>
        </div>
      </div>
    </div>
  );
}
