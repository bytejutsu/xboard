import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  getCurrentBoardIdSelector,
  getRerenderBoardFlagSelector,
} from "@Store/board/selectors";
import { setRerenderBoardFlag } from "@Store/board";
import { getGlobalMountedSelector } from "@Store/draw/selectors";
import TBoardDraw from "../drawcore/TBoardDraw";

export default function RerenderBoardHandler({ canvas }) {
  const store = useStore();
  const dispatch = useDispatch();
  const rerenderFlag = useSelector(getRerenderBoardFlagSelector);
  const currentBoardId = useSelector(getCurrentBoardIdSelector);
  const mounted = useSelector(getGlobalMountedSelector);
  const reInitCanvas = () => {
    const listBoard = store.getState().board.listBoard;
    const boardData = listBoard?.find((item) => item?.id === currentBoardId);
    if (!boardData?.data) {
      return;
    }
    let json = JSON.stringify(boardData?.data);
    canvas.current?.clearCanvas();
    if (!json?.length) {
      json = "{}";
    }
    canvas.current?.canvas.loadFromJSON(json, () => {
      canvas.current?.canvas?.renderAll();
    });
  };
  React.useEffect(() => {
    if (rerenderFlag) {
      reInitCanvas();
      dispatch(setRerenderBoardFlag(0));
      setTimeout(() => {
        TBoardDraw.getInstance().animateZoomFitContent();
      }, 100);
    }
  }, [rerenderFlag, currentBoardId]);
  React.useEffect(() => {
    if (mounted) {
      dispatch(setRerenderBoardFlag(Date.now()));
      reInitCanvas();
      dispatch(setRerenderBoardFlag(0));
      setTimeout(() => {
        TBoardDraw.getInstance().animateZoomFitContent();
      }, 100);
    }
  }, [mounted]);

  return null;
}
