import React from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { generateNewBoard } from "../utils/boardUtils";
import {
  createNewBoard,
  saveBoard,
  setCurrentBoardId,
  createNewBoardWithoutChangePage,
  updateBoard,
  undoBoard,
  redoBoard,
  setRerenderBoardFlag,
  deleteBoard,
} from "../Store/board";
import { BOARD_BACKGROUND_TYPE } from "@constants";

export default function useBoardManager() {
  const store = useStore();
  const dispatch = useDispatch();

  const goToBoard = React.useCallback((num = 1) => {
    const listBoard = store.getState().board.listBoard;
    const length = listBoard?.length || 0;
    if (length < 2) {
      return;
    }
    const currentBoardId = store.getState().board.currentBoardId;
    const index = listBoard?.findIndex((item) => item?.id === currentBoardId);
    if (index === -1) {
      return;
    }
    let nextIndex = (index + num) % length;
    if (nextIndex < 0) {
      nextIndex = length + nextIndex;
    }
    dispatch(setRerenderBoardFlag(Date.now()));
    dispatch(setCurrentBoardId(listBoard[nextIndex]?.id));
  }, []);

  const createBoard = React.useCallback(
    (type = BOARD_BACKGROUND_TYPE.DOT, color = "#fff", image) => {
      const newBoard = generateNewBoard({
        boardName: "Board " + Date.now(),
        boardType: type,
        boardColor: color,
        boardImage: image,
      });
      dispatch(createNewBoard(newBoard));
    },
    []
  );
  const createBoardNotChangePage = React.useCallback((data = null) => {
    const newBoard = generateNewBoard({
      boardName: "Board " + Date.now(),
      boardType: BOARD_BACKGROUND_TYPE.DOT,
      boardColor: "#ffffff",
      boardImage: "",
      data: data,
    });
    dispatch(createNewBoardWithoutChangePage(newBoard));
  }, []);

  const saveBoardCanvas = React.useCallback((boardData) => {
    const currentBoardId = store.getState().board.currentBoardId;
    if (!currentBoardId) {
      createBoardNotChangePage(boardData);
      return;
    }
    dispatch(
      saveBoard({
        id: currentBoardId,
        canvas: boardData,
      })
    );
  }, []);

  const updateBoardAction = React.useCallback((opt) => {
    const currentBoardId = store.getState().board.currentBoardId;
    if (!currentBoardId) {
      const newBoard = generateNewBoard({
        boardName: "Board " + Date.now(),
        boardType: opt?.backgroundType || BOARD_BACKGROUND_TYPE.DOT,
        boardColor: opt?.backgroundColor || "#ffffff",
        boardImage: opt?.boardImage || null,
        data: {},
      });
      dispatch(createNewBoard(newBoard));
    } else {
      dispatch(
        updateBoard({
          ...opt,
        })
      );
    }
  }, []);

  const deleteBoardAction = React.useCallback(() => {
    dispatch(deleteBoard());
  }, []);
  const handleUndo = React.useCallback(() => {
    dispatch(undoBoard());
  }, []);
  const handleRedo = React.useCallback(() => {
    dispatch(redoBoard());
  }, []);
  return {
    handleUndo,
    handleRedo,
    goToBoard,
    createBoard,
    deleteBoard: deleteBoardAction,
    saveBoardCanvas,
    updateBoard: updateBoardAction,
  };
}
