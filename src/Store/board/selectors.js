import { createSelector } from "reselect";

export const self = (state) => state.board;

export const getListBoardSelector = createSelector(
  self,
  (data) => data.listBoard || null
);
export const getCurrentBoardIdSelector = createSelector(
  self,
  (data) => data.currentBoardId || null
);
export const getCurrentBoardDataSelector = createSelector(
  self,
  (data) =>
    data?.listBoard?.find((board) => board.id === data?.currentBoardId) || null
);
export const getBoardPaginationSelector = createSelector(self, (data) => {
  const total = data?.listBoard?.length || 0;
  const current = data?.listBoard?.findIndex(
    (board) => board.id === data?.currentBoardId
  );
  return {
    total,
    current: current + 1,
  };
});
export const canUnDoRedoSelector = createSelector(self, (data) => {
  const current = data?.listBoard?.find(
    (board) => board.id === data?.currentBoardId
  );
  return {
    canUndo: current?.canUndo || false,
    canRedo: current?.canRedo || false,
  };
});
export const getToolToShowSelector = createSelector(
  self,
  (data) => data?.toolToShow || []
);
export const getRerenderBoardFlagSelector = createSelector(
  self,
  (data) => data?.rerenderBoardFlag || null
);
