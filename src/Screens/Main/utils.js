import { HEIGHT_HEADER } from "@/utils/constants";
import { invertColor } from "../../utils/color";
import TBoardDraw, { BRUSH_TYPE } from "./drawcore/TBoardDraw";

const rotateIcon =
  "data:image/svg+xml;charset=UTF-8,%3csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cellipse cx='12.5' cy='11.9995' rx='12.5' ry='12' fill='%23$bg'/%3e%3cpath d='M15.339 3.89271C11.5359 2.76833 7.56375 4.65476 5.8179 8.17878L3.71048 7.55572L5.32676 14.4578L10.28 9.498L8.3507 8.9276C9.64696 6.8082 12.1844 5.72277 14.6215 6.4433C17.5747 7.31641 19.2776 10.5142 18.4174 13.5717C17.5573 16.6291 14.4549 18.4063 11.5017 17.5332C10.7063 17.298 9.99086 16.896 9.37507 16.3382L7.67827 18.3372C8.57902 19.1531 9.62395 19.7407 10.7841 20.0837C15.0957 21.3583 19.6252 18.7638 20.881 14.2999C22.1367 9.83609 19.6506 5.16743 15.339 3.89271Z' fill='$fg'/%3e%3c/svg%3e ";
const dotIcon =
  "data:image/svg+xml;charset=UTF-8,%3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='11' cy='11' r='11' fill='%23$bg'/%3e%3c/svg%3e";
const resizeIcon =
  "data:image/svg+xml;charset=UTF-8,%3csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='11' cy='11' r='11' fill='%23$bg'/%3e%3cg clip-path='url(%23clip0_115_696)'%3e%3cpath d='M5.02699 5L10.8659 5.00229L8.62693 7.13689L11.299 9.68446L9.70055 11.2088L7.02909 8.6612L5 10.5968L5.02699 5ZM15.0813 13.2913L16.9898 11.4393L17 17L11.194 16.9977L13.4822 14.8156L10.5289 11.9987L12.1273 10.4744L15.0813 13.2913Z' fill='$fg'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_115_696'%3e%3crect width='12' height='12' fill='white' transform='matrix(0 -1 1 0 5 17)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e ";

export const handleScaleCursor = (transform, store, width) => {
  const scale = transform[0] || 1;
  const brushType = store.getState().draw.brushType;

  let strokeWidth = 10;
  if (brushType === BRUSH_TYPE.PENCIL) {
    strokeWidth = store.getState().draw.pencilConfig.width;
  } else if (brushType === BRUSH_TYPE.HIGHLIGHTER) {
    strokeWidth = store.getState().draw.markersConfig.width;
  }

  const widthNumber =
    (((strokeWidth ? strokeWidth : strokeWidth || 10) * scale) / 6) * 3;
  const widthScale = `${widthNumber * 2}px`;
  const cursor = document.querySelector(".cursor");
  if (!cursor) {
    return;
  }
  cursor.style.width = widthScale;
  cursor.style.height = widthScale;
};
export const handleTrasnformBackground = (transform) => {
  if (!transform?.length) {
    return;
  }
  let type = null;
  if (document.getElementById("line_background") !== null) {
    type = "line_background";
  } else if (document.getElementById("grid_background") !== null) {
    type = "grid_background";
  } else if (document.getElementById("dot_background") !== null) {
    type = "dot_background";
  }

  handleRedraw(transform[0], 20, transform[4], transform[5], type);
  const transformString = `matrix(${transform[0]},${transform[1]},${transform[2]},${transform[3]},${transform[4]},${transform[5]})`;
  let background = document.getElementById("background-transform");
  if (!background) return;
  background.style.transform = transformString;

  let dotBg = document.getElementById("dot-bg");
  if (dotBg) {
    dotBg.setAttribute(
      "r",
      `${Math.min(2, Math.max(1, 0.2 / transform[0]))}px`
    );
  }
};

function handleRedraw(scale, maxScale, x, y, type) {
  if (!type) return;
  let t = scale,
    i = maxScale;
  let s = t / i;
  for (; s < 1; ) s *= 5;
  let smallCellSize = 16 * s,
    megaCellSize = (type === "dot_background" ? 3 : 5) * smallCellSize,
    smallCellAlpha = 0.0125 * smallCellSize - 0.2,
    skipSmallCells = smallCellAlpha <= 0.2;
  draw(megaCellSize, smallCellSize, skipSmallCells, smallCellAlpha, x, y, type);
}

const draw = (
  megaCellSize,
  smallCellSize,
  skipSmallCells,
  smallCellAlpha,
  offsetX,
  offsetY,
  type
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const e = offsetX;
  const t = offsetY,
    { width: i, height: s } = { width, height };
  let canvas = document.getElementById(type);
  if (!canvas) return;
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  let o = e % megaCellSize;
  o >= 0 && (o -= megaCellSize);
  let n = t % megaCellSize;
  n >= 0 && (n -= megaCellSize);

  let r = o;
  if (type === "grid_background") {
    for (; r <= i; ) (r += megaCellSize), ctx.moveTo(r, 0), ctx.lineTo(r, s);
    for (r = n; r <= s; )
      (r += megaCellSize), ctx.moveTo(0, r), ctx.lineTo(i, r);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#DEDEDE";
    ctx.stroke();

    if (!skipSmallCells) {
      ctx.beginPath();
      let t = 0;
      r = o;
      for (; r <= i; )
        r >= 0 && t % 5 != 0 && (ctx.moveTo(r, 0), ctx.lineTo(r, s)),
          (r += smallCellSize),
          t++;

      for (r = n, t = 0; r <= s; )
        r >= 0 && t % 5 != 0 && (ctx.moveTo(0, r), ctx.lineTo(i, r)),
          (r += smallCellSize),
          t++;
      ctx.globalAlpha = smallCellAlpha;
      ctx.strokeStyle = "#DEDEDE";
      ctx.stroke();
    }
  } else if (type === "line_background") {
    for (r = n; r <= s; )
      (r += megaCellSize), ctx.moveTo(0, r), ctx.lineTo(i, r);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#DEDEDE";
    ctx.stroke();

    if (!skipSmallCells) {
      ctx.beginPath();
      let t = 0;
      r = o;

      for (r = n, t = 0; r <= s; )
        r >= 0 && t % 5 != 0 && (ctx.moveTo(0, r), ctx.lineTo(i, r)),
          (r += smallCellSize),
          t++;
      ctx.globalAlpha = smallCellAlpha;
      ctx.strokeStyle = "#DEDEDE";
      ctx.stroke();
    }
  } else if (type === "dot_background") {
    let a = 0;

    for (a = n; a <= s; a += megaCellSize) {
      r = o;
      for (; r <= i; ) {
        r += megaCellSize;
        ctx.moveTo(r, a);
        ctx.arc(r, a, 2, 0, Math.PI * 2, false);
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#DEDEDE";
    ctx.fill();

    if (!skipSmallCells) {
      ctx.beginPath();
      let t = 0;
      let b = 0;
      r = o;

      for (b = n, t = 0; b <= s; ) {
        r = o;
        let k = 0;
        for (; r <= i; ) {
          if (r >= 0) {
            ctx.moveTo(r, b);
            ctx.arc(r, b, 2, 0, Math.PI * 2, false);
          }
          r += smallCellSize;
          k++;
        }
        b += smallCellSize;
        t++;
      }
      ctx.fillStyle = "#DEDEDE";
      ctx.globalAlpha = 1;
      ctx.fill();
    }
  } else {
  }
};

function renderTextRotate(ctx, left, top, styleOverride, fabricObject) {
  ctx.save();
  ctx.translate(left, top);
  ctx.font = "16px Arial";
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
  ctx.fillText(
    `${parseInt(fabricObject.angle) + String.fromCharCode(176)}`,
    0,
    0
  );
  ctx.restore();
}
export const initFabric = (
  fabricRef,
  transformListener,
  selectObjectListener,
  tapDownListener,
  tapUpListener,
  rotateGroupObjectListener,
  onFinishDrawListener,
  onObjectStateChangeListener,
  onFinishAutoDrawListener
) => {
  // const canvas = new fabric.Canvas("canvas", {
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  //   selection: false, // disables drag-to-select
  //   backgroundColor: "transparent",
  //   isDrawingMode: false,
  //   defaultCursor: "default",
  //   grabbing: "grabbing",
  //   hoverCursor: "grab",
  //   moveCursor: "grabbing",
  // });

  renderControl("#FF9C25");

  fabricRef.current = TBoardDraw.getInstance();
  fabricRef.current.transformListener = transformListener;
  fabricRef.current.selectListener = selectObjectListener;
  fabricRef.current.tapDownListener = tapDownListener;
  fabricRef.current.tapUpListener = tapUpListener;
  fabricRef.current.rotateGroupObjectListener = rotateGroupObjectListener;
  fabricRef.current.onFinishDrawListener = onFinishDrawListener;
  fabricRef.current.objectStateChangeListener = onObjectStateChangeListener;
  fabricRef.current.onFinishAutoDrawListener = onFinishAutoDrawListener;
};

export const renderControl = (color) => {
  if (color.length !== 7) {
    return;
  }
  let nBgColor = color.slice(1);
  let fgColor = invertColor(color, true);
  let nFGColor = fgColor.replace("#", "%23");

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerStyle = "circle";
  fabric.Object.prototype.cornerColor = "#ff9c25";
  fabric.Object.prototype.cornerStrokeColor = "#666666";
  fabric.Object.prototype.borderColor = "#ff9c25";
  fabric.Object.prototype.cornerSize = 15;
  fabric.Object.prototype.borderOpacityWhenMoving = 0.8;
  fabric.Object.prototype.setControlVisible("ml", false);
  fabric.Object.prototype.setControlVisible("mr", false);
  fabric.Object.prototype.setControlVisible("mt", false);
  fabric.Object.prototype.setControlVisible("mb", false);

  /**
   * Default type of fabric.IText "IText"
   */
  fabric.IText.prototype.type = "IText";

  const rotateImg = document.createElement("img");

  let nRotateIcon = dotIcon;
  let nDotIcon = dotIcon;
  let nResizeIcon = dotIcon;

  nRotateIcon = nRotateIcon.replace("$bg", nBgColor);
  nDotIcon = nDotIcon.replace("$bg", nBgColor);
  nResizeIcon = nResizeIcon.replace("$bg", nBgColor);

  nRotateIcon = nRotateIcon.replace("$fg", nFGColor);
  nResizeIcon = nResizeIcon.replace("$fg", nFGColor);

  rotateImg.src = nRotateIcon;
  const dotImage = document.createElement("img");
  dotImage.src = nDotIcon;
  const resizeImage = document.createElement("img");
  resizeImage.src = nResizeIcon;

  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -40,
    cursorStyle: "grab",
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: "rotate",
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 12;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(rotateImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
    withConnection: true,
  });

  fabric.Object.prototype.controls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 0,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: "nw-resize",
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 12;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(dotImage, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });
  fabric.Object.prototype.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 0,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: "ne-resize",
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 12;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(dotImage, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });

  fabric.Object.prototype.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    offsetY: 0,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: "sw-resize",
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 12;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(dotImage, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });
  fabric.Object.prototype.controls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    offsetY: 0,
    actionHandler: fabric.controlsUtils.scalingEqually,
    cursorStyle: "se-resize",
    render: (ctx, left, top, styleOverride, fabricObject) => {
      const size = 12;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(resizeImage, -size / 2, -size / 2, size, size);
      ctx.restore();
    },
  });

  // fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  //   x: 0,
  //   y: -0.5,
  //   offsetY: -10,
  //   offsetX: 10,
  //   cursorStyle: "pointer",
  //   render: renderTextRotate,
  //   // cornerSize: 24,
  // });
};

export const addListener = (el, ...args) => el.addEventListener(...args);

/**
 * @param {"pencil" | "eraser" | "select" | "default"} value
 */
export const changeCursor = (value = "default") => {
  const canvasEl = document.getElementsByClassName("upper-canvas").item(0);
  canvasEl.id = value;
};
