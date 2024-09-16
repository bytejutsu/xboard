import { v4 as uuidv4 } from "uuid";
import { BOARD_BACKGROUND_TYPE } from "@constants";
export const generateNewBoard = ({
  boardName = "Name",
  boardType = BOARD_BACKGROUND_TYPE.GRID,
  boardImage = null,
  boardColor = null,
  data = {},
}) => {
  const board = {
    backgroundType: boardType,
    backgroundColor: boardColor,
    boardName: boardName,
    boardImage: boardImage,
    data: data,
    future: [],
    history: [],
    canUndo: false,
    canRedo: false,
    id: `board-${uuidv4()}`,
  };
  return board;
};
