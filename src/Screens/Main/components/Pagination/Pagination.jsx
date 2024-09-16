import React from "react";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
//HOOK
import useBoardManager from "@Hooks/useBoardManager";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardPaginationSelector,
  getCurrentBoardIdSelector,
} from "@Store/board/selectors";
import { getBoardLockedSelector } from "@Store/draw/selectors";
//STYLE
import "./styles.scss";
import { setLocked } from "@Store/draw";

//UTIL
//CONSTANT
import { CUSTOM_EXPORT_FIELD } from "../../constants";
import { BackgroundSettingButton } from "../ToolBar/Components";
import { LockedIcon, UnLockedIcon } from "../../../../assets/svg";
export default function Pagination({ canvas }) {
  const dispatch = useDispatch();
  const pagination = useSelector(getBoardPaginationSelector);
  const { goToBoard } = useBoardManager();
  const locked = useSelector(getBoardLockedSelector);
  const currentBoard = useSelector(getCurrentBoardIdSelector);

  const toggleLocked = () => {
    dispatch(setLocked(!locked));
  };

  return (
    <div className="pagination__container d-flex flex-row align-items-center justify-content-between">
      {/* <BackgroundSettingButton canvas={canvas} />
      <div className="divider" /> */}
      <CaretLeftOutlined
        onClick={() => {
          if (!currentBoard) {
            return;
          }
          goToBoard(-1);
        }}
        size={26}
      />
      <div className="pagination__text d-flex flex-row">
        {pagination.current} / {pagination.total}
      </div>
      <CaretRightOutlined
        onClick={() => {
          if (!currentBoard) {
            return;
          }
          goToBoard(1);
        }}
      />
      <div className="divider" />
      {locked ? (
        <div onClick={toggleLocked} className="lock-btn">
          <LockedIcon />
        </div>
      ) : (
        <div onClick={toggleLocked} className="lock-btn">
          <UnLockedIcon />
        </div>
      )}
    </div>
  );
}
