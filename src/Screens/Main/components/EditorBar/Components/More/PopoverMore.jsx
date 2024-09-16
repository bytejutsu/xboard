import TBoardDraw from "@/Screens/Main/drawcore/TBoardDraw";
import "./styled.scss";

import React from "react";

const PopoverMore = ({ onClickItem = () => {} }) => {
  const items = [
    {
      title: "Copy",
      shortcut: "Ctrl/Cmd + C",
      onClick: () => {
        TBoardDraw.getInstance().handleShortcutCopy({}, true);
      },
    },
    {
      title: "Send to font",
      shortcut: "PgUp",
      onClick: () => {
        TBoardDraw.getInstance().handleShortcutPgUp({}, true);
      },
    },
    {
      title: "Send to back",
      shortcut: "PgDn",
      onClick: () => {
        TBoardDraw.getInstance().handleShortcutPgDn({}, true);
      },
    },
    {
      title: "Delete",
      shortcut: "Delete",
      onClick: () => {
        TBoardDraw.getInstance().deleteObject();
      },
    },
  ];

  return (
    <div className="container-popover-more">
      {items.map((item, idx) => (
        <div
          className="item-popover-more"
          key={idx}
          onClick={() => {
            onClickItem();
            item.onClick();
          }}
        >
          <div className="item-popover-more__title">{item.title}</div>
          <div className="item-popover-more__shortcut">{item.shortcut}</div>
        </div>
      ))}
    </div>
  );
};

export default PopoverMore;
