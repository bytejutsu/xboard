import { createSlice } from "@reduxjs/toolkit";
import equal from "fast-deep-equal";
import { BOARD_BACKGROUND_TYPE } from "@constants";
import { TOOLBAR_ELEMENTS } from "../../Screens/Main/constants";
import { generateNewBoard } from "../../utils/boardUtils";
const defaultBoard = generateNewBoard({
  boardName: "Board " + Date.now(),
  boardType: BOARD_BACKGROUND_TYPE.GRID,
  boardColor: "#ffffff",
  boardImage: null,
  data: {},
});

const initialState = {
  listBoard: [defaultBoard],
  currentBoardId: defaultBoard.id,
  toolToShow: TOOLBAR_ELEMENTS,
  rerenderBoardFlag: null,
};

export const drawSlice = createSlice({
  name: "board",
  initialState,

  reducers: {
    saveBoard: (state, action) => {
      if (state.rerenderBoardFlag) {
        // UNDO REDO DOES NOT SAVE
        return;
      }
      const boardId = action.payload?.id;
      const boardData = action.payload.canvas;
      const currentBoard = state.listBoard.find((item) => item.id === boardId);
      if (!currentBoard) {
        return;
      }
      let history = currentBoard?.history;

      if (history.length > 0 && equal(boardData, history[history.length - 1])) {
        return;
      }

      if (currentBoard?.data) {
        history.push({ ...currentBoard.data, idx: history.length - 1 });
      }

      state.listBoard = state.listBoard.map((item) => {
        if (item.id !== boardId) {
          return item;
        }
        return {
          ...item,
          data: { ...boardData, idx: 999 },
          history: history,
          future: [],
          canUndo: history.length > 1,
          canRedo: false,
        };
      });
    },
    undoBoard: (state, action) => {
      const boardId = state.currentBoardId;
      const currentBoard = state.listBoard.find((item) => item.id === boardId);

      if (!currentBoard) return;
      if (!currentBoard.canUndo) return;
      let present = currentBoard.data;

      let newPresent = currentBoard.history[currentBoard.history.length - 1];

      let newHistory = currentBoard.history.slice(
        0,
        currentBoard.history.length - 1
      );

      state.listBoard = state.listBoard.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            future: [present, ...board.future],
            data: newPresent,
            history: newHistory,
            canRedo: true,
            canUndo: newHistory.length > 0,
          };
        }
        return board;
      });
      state.rerenderBoardFlag = Date.now();
    },

    redoBoard: (state, action) => {
      const boardId = state.currentBoardId;
      const currentBoard = state.listBoard.find((item) => item.id === boardId);
      if (!currentBoard) return;
      if (!currentBoard.canRedo) return;

      let present = currentBoard.data;
      let newPresent = currentBoard.future[0];
      let newFuture = currentBoard.future.slice(1);

      state.listBoard = state.listBoard.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            future: newFuture,
            data: newPresent,
            history: [...board.history, present],
            canUndo: true,
            canRedo: newFuture.length > 0,
          };
        }
        return board;
      });
      state.rerenderBoardFlag = Date.now();
    },

    setCurrentBoardId: (state, action) => {
      state.currentBoardId = action.payload;
    },
    createNewBoard: (state, action) => {
      const boardData = action.payload;
      state.currentBoardId = boardData.id;
      state.listBoard.push(boardData);
    },
    createNewBoardWithoutChangePage: (state, action) => {
      const boardData = action.payload;
      state.listBoard.push(boardData);
    },
    saveBoardCanvasData: (state, action) => {
      const boardData = action.payload;
      state.listBoard = state.listBoard.map((item) => {
        if (item.id !== boardData.id) {
          return item;
        }
        return {
          ...item,
          data: boardData?.canvas,
        };
      });
    },
    updateBoard: (state, action) => {
      state.listBoard = state.listBoard.map((item) => {
        if (item.id !== state.currentBoardId) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        };
      });
    },
    setToolToShow: (state, action) => {
      state.toolToShow = action.payload;
    },
    setListBoard: (state, action) => {
      state.listBoard = action.payload;
    },
    setRerenderBoardFlag: (state, action) => {
      state.rerenderBoardFlag = action.payload;
    },
    clearUndoRedo: (state) => {
      state.listBoard = state.listBoard.map((item) => {
        return {
          ...item,
          history: [],
          future: [],
          canUndo: false,
          canRedo: false,
        };
      });
    },
    deleteBoard: (state) => {
      if (!state.currentBoardId) return;
      if (state.listBoard.length === 1) {
        state.listBoard[0].data = {};
        state.listBoard[0].history = [];
        state.listBoard[0].future = [];
        state.listBoard[0].canRedo = false;
        state.listBoard[0].canUndo = false;
        state.rerenderBoardFlag = Date.now();
        return;
      }
      const currentBoardIdx = state.listBoard.findIndex(
        (item) => item.id === state.currentBoardId
      );

      const newBoardId = state.listBoard[Math.max(1, currentBoardIdx - 1)].id;

      state.listBoard = state.listBoard.filter(
        (item) => item.id !== state.currentBoardId
      );
      state.currentBoardId = newBoardId;
      state.rerenderBoardFlag = Date.now();
    },
  },
});

export const {
  setIsViewMode,
  setCurrentBoardId,
  createNewBoard,
  saveBoardCanvasData,
  saveBoard,
  createNewBoardWithoutChangePage,
  updateBoard,
  setToolToShow,
  setListBoard,
  undoBoard,
  redoBoard,
  setRerenderBoardFlag,
  clearUndoRedo,
  deleteBoard,
} = drawSlice.actions;

export default drawSlice.reducer;
