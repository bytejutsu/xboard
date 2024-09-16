import React from "react";
//REDUX
import { useSelector } from "react-redux";
import { getIsHideAllUISelector } from "@Store/draw/selectors";
import { getCurrentBoardDataSelector } from "@Store/board/selectors";
//UTIL
import equal from "fast-deep-equal";
//COMPONENT
import DotBackground from "./DotBackground";
import GridBackground from "./GridBackground";
import HorizontalLineBackground from "./HorizontalLineBackground";
import SolidBackground from "./SolidBackground";
import ImageBackground from "./ImageBackground";
//CONSTANT
import { BOARD_BACKGROUND_TYPE } from "@constants";
import { invertColor } from "../../../../utils/color";
import { renderControl } from "../../utils";

const CanvasBackground = () => {
  const boardData = useSelector(getCurrentBoardDataSelector, (prev, next) => {
    const prevProps = {
      type: prev?.backgroundType,
      color: prev?.backgroundColor,
      image: prev?.backgroundImage,
    };
    const nextProps = {
      type: next?.backgroundType,
      color: next?.backgroundColor,
      image: next?.backgroundImage,
    };
    return equal(prevProps, nextProps);
  });
  const isHideUI = useSelector(getIsHideAllUISelector);
  const invertedColor = invertColor(
    boardData?.backgroundColor || "#ffffff",
    true
  );

  React.useEffect(() => {
    renderControl(invertedColor);
  }, [invertedColor]);
  if (isHideUI) return null;
  if (boardData?.backgroundType === BOARD_BACKGROUND_TYPE.DOT) {
    return (
      <DotBackground
        invertedColor={invertedColor}
        backgroundColor={boardData?.backgroundColor}
        key={BOARD_BACKGROUND_TYPE.DOT}
      />
    );
  }
  if (boardData?.backgroundType === BOARD_BACKGROUND_TYPE.GRID) {
    return (
      <GridBackground
        invertedColor={invertedColor}
        backgroundColor={boardData?.backgroundColor}
        key={BOARD_BACKGROUND_TYPE.GRID}
      />
    );
  }
  if (boardData?.backgroundType === BOARD_BACKGROUND_TYPE.LINE) {
    return (
      <HorizontalLineBackground
        invertedColor={invertedColor}
        backgroundColor={boardData?.backgroundColor}
        key={BOARD_BACKGROUND_TYPE.LINE}
      />
    );
  }
  if (boardData?.backgroundType === BOARD_BACKGROUND_TYPE.IMAGE) {
    return <ImageBackground image={boardData?.boardImage} />;
  }
  if (boardData?.backgroundType === BOARD_BACKGROUND_TYPE.SOLID) {
    return <SolidBackground backgroundColor={boardData?.backgroundColor} />;
  }

  return <GridBackground key={BOARD_BACKGROUND_TYPE.DOT} />;
};
export default CanvasBackground;
