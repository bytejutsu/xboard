import React from "react";
import { useSelector } from "react-redux";

import useToggleMode from "@Hooks/useToggleMode";
import { getGlobalMountedSelector } from "../../../Store/draw/selectors";

const ChangeViewModeHandler = ({ canvas }, ref) => {
  const { isDrawMode, isSelectMode, isViewMode, isAutoDrawMode } =
    useToggleMode();
  const mounted = useSelector(getGlobalMountedSelector);

  const enableFreeStyleSelect = (hasSelected = false) => {
    if (isSelectMode) {
      if (hasSelected) {
        canvas.current?.enableDragMode();
      } else {
        canvas.current?.enableSelectMode();
      }
    }
  };

  React.useImperativeHandle(ref, () => {
    return {
      enableFreeStyleSelect: enableFreeStyleSelect,
    };
  });
  React.useEffect(() => {
    if (!mounted) {
      return;
    }
    if (isViewMode) {
      canvas.current?.enableDragMode();
    }
    if (isSelectMode) {
      canvas.current?.enableSelectMode();
    }
    if (isDrawMode || isAutoDrawMode) {
      canvas.current?.enableDrawingMode();
    }
  }, [isViewMode, isDrawMode, isSelectMode, mounted, isAutoDrawMode]);

  return null;
};
export default React.forwardRef(ChangeViewModeHandler);
