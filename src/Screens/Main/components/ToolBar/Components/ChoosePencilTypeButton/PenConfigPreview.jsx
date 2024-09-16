import React from "react";

export default function PenConfigPreview({
  onClick,
  width = 1,
  color = "#ff9c25",
  active = false,
}) {
  return (
    <div
      className={"pencfg-preview " + (active ? "active" : "")}
      onClick={onClick}
    >
      <div
        className="pencfg-preview__inner"
        style={{
          backgroundColor: color,
          width: `${Math.min(100, (width / 30) * 100)}%`,
        }}
      ></div>
    </div>
  );
}
