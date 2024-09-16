import { colorObjectToRGBAString } from "../../../utils/color";

import CustomSelectBrush from "./brushes/CustomSelectBrush";
import StraightConnectionLineBrush from "./brushes/StraightConnectionLineBrush";

import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";
import { STICKY_NOTES } from "../../../assets/svg/stickyNotes";
import { addListener, changeCursor } from "../utils";
import Observable from "@utils/Observable";
import {
  BOARD_MAX_X,
  BOARD_MAX_Y,
  BOARD_MIN_X,
  BOARD_MIN_Y,
  DEFAULT_VIEW_PORT,
  MAX_ZOOM,
  MINIMUM_ZOOM,
} from "@/utils/constants";
import Notes1 from "@assets/images/stickyNotes/notes1.png";
import AutoDrawBrush from "./brushes/AutoDrawBrush";
import {
  convertTransformMatrix,
  mapCursorPositionToCanvasPosition,
} from "../../../utils/position";

export const BRUSH_TYPE = {
  PENCIL: "PENCIL",
  HIGHLIGHTER: "HIGHLIGHTER",
  CIRCLE: "CIRCLE",
  ERASER_DEF: "ERASER_DEF",
  ERASER_GROUP: "ERASER_GROUP",
  PATTERN: "PATTERN",
  SELECT: "SELECT",
  STRAIGHT: "STRAIGHT",
  AUTO_DRAW: "AUTO_DRAW",
};

export default class TBoardDraw extends Observable {
  /**
   * @public
   * @type {TBoardDraw} instance
   */
  instance;

  /**
   * @public
   * @type {fabric.Object[]}
   *  */
  selectedObject = [];

  /**
   * @public
   * @type {fabric.Object | undefined}
   *  */
  rotatingObject = undefined;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  erasingRemovesErasedObjects = false;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  erasingEnable = false;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  isDragMode = false;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  isDragging = false;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  lockZoom = false;

  /**
   * @public
   * @type {fabric.Point | undefined}
   */
  lastPosition = undefined;

  /**
   * @public
   * @type {boolean}
   * @default false
   */
  drawStraightLine = false;

  /**
   * @public
   * @type {fabric.Point | undefined}
   */
  currentCanvasPosition = new fabric.Point(0, 0);
  listSnapLine = {};
  ink = [];

  /**
   * @type {fabric.Object | undefined}
   * @default undefined
   *  */
  _clipboard;

  /**
   * @type {fabric.Canvas}
   */
  canvas;

  //CUSTOM EVENT BINDING DATA OUT
  /**
   * @param {fabric.Canvas['viewportTransform']} viewport
   */
  transformListener = (viewport) => {};
  selectListener = () => {};
  tapDownListener = () => {};
  tapUpListener = () => {};
  onFinishDrawListener = () => {};
  rotateGroupObjectListener = () => {};
  objectStateChangeListener = () => {};
  onFinishAutoDrawListener = () => {};

  /**
   * @private
   * @constructor
   */
  constructor() {
    super();
    if (this.instance) throw new Error("You can only create one instance!");
    const canvas = new fabric.Canvas("canvas", {
      width: window.innerWidth,
      height: window.innerHeight,
      selection: false, // disables drag-to-select
      backgroundColor: "transparent",
      isDrawingMode: false,
      defaultCursor: "default",
      grabbing: "grabbing",
      hoverCursor: "grab",
      moveCursor: "grabbing",
      viewportTransform: DEFAULT_VIEW_PORT,
      preserveObjectStacking: true, // use for stack position objects
    });

    this.canvas = canvas;
    this.listenerAll();
  }

  /**
   * @returns {TBoardDraw}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new TBoardDraw();
    }

    return this.instance;
  }

  _deleteObjectListener() {
    this.canvas.on({
      "mouse:down": (opt) => {
        if (this.erasingRemovesErasedObjects) {
          this.erasingEnable = true;
          this.canvas.getObjects().map((item) => {
            item.perPixelTargetFind = true;
          });
        }
      },
      "mouse:up": (opt) => {
        if (this.erasingRemovesErasedObjects) {
          this.erasingEnable = false;
          this.canvas.getObjects().map((item) => {
            item.perPixelTargetFind = false;
          });
        }
      },
      "mouse:move": (e) => {
        if (this.erasingEnable) {
          let pointer = this.canvas.getPointer(e, true);
          var target = this.canvas._searchPossibleTargets(
            this.canvas._objects,
            pointer
          );
          if (target) {
            this.canvas.remove(target);
            this.canvas.renderAll();
          }
        }
      },
    });
  }

  _selectObjectListener() {
    this.canvas.on({
      "selection:created": (evt) => {
        this.selectedObject = evt.selected;
        this.selectListener(this.selectedObject);
        this.rotatingObject = this.canvas.getActiveObject();
      },
      "selection:changed": (evt) => {
        this.selectedObject = evt.selected;
        this.selectListener(this.selectedObject);
        this.rotatingObject = this.canvas.getActiveObject();
      },
      "selection:updated": (evt) => {
        this.selectedObject = evt.selected;
        this.selectListener(this.selectedObject);
        this.rotatingObject = this.canvas.getActiveObject();
      },
      "selection:cleared": (evt) => {
        this.selectedObject = [];
        this.selectListener(this.selectedObject);
        this.rotatingObject = null;
      },
      "mouse:dblclick": (evt) => {
        if (evt.target?.mathData?.id) {
          this.notify("mathdoubleclick", evt.target);
        }
      },
    });
  }
  _snapToGridOnMoveObjectListener() {
    var grid = 100;
    var that = this;
    this.canvas.on({
      "object:moving": function (options) {
        if (
          Math.round((options.target.left / grid) * 4) % 4 == 0 &&
          Math.round((options.target.top / grid) * 4) % 4 == 0
        ) {
          // that.removeAllSnapLine();
          // that.renderSnapLine(
          //   Math.round(options.target.left / grid) * grid,
          //   -9999,
          //   Math.round(options.target.left / grid) * grid,
          //   99999
          // );
          // that.renderSnapLine(
          //   -9999,
          //   Math.round(options.target.top / grid) * grid,
          //   9999,
          //   Math.round(options.target.top / grid) * grid
          // );
          options.target
            .set({
              left: Math.round(options.target.left / grid) * grid,
              top: Math.round(options.target.top / grid) * grid,
            })
            .setCoords();
        } else {
          that.removeAllSnapLine();
        }
      },
    });
  }

  _dragPannelListener() {
    this.canvas.on({
      "mouse:down": (opt) => {
        let event = opt.e;

        this.tapDownListener(this.selectedObject);
        event.preventDefault();

        if (!this.isDragMode || this.selectedObject?.length) {
          return;
        }
        if (event.changedTouches?.length) {
          event = event.changedTouches[0];
        }
        this.lastPosition = {
          x: event.clientX,
          y: event.clientY,
        };
        this.isDragging = true;
      },
      "mouse:move": (opt) => {
        let event = opt.e;

        if (!this.isDragging) {
          return;
        }
        if (this.selectedObject?.length) {
          this.isDragging = false;
          return;
        }
        if (event.changedTouches?.length) {
          event = event.changedTouches[0];
        }
        if (!this.lastPosition) {
          this.lastPosition = {
            x: event.clientX,
            y: event.clientY,
          };
        }

        this.isDragging = true;
        const deltaX = this.lastPosition.x - event.clientX;
        const deltaY = this.lastPosition.y - event.clientY;
        this.currentCanvasPosition.x += deltaX;
        this.currentCanvasPosition.y += deltaY;
        this.canvas.relativePan({
          x: -deltaX,
          y: -deltaY,
        });

        this.transformListener(this.canvas.viewportTransform);
        this.lastPosition = {
          x: event.clientX,
          y: event.clientY,
        };
      },
      "mouse:up": (opt) => {
        const { currentTarget } = opt;

        this.tapUpListener(this.selectedObject);

        if (this.canvas?.isDrawingMode && !!currentTarget) {
          this.onFinishDrawListener(currentTarget);
        }

        this.removeAllSnapLine();
        if (this.isDragging) {
          this.lastPosition = null;
          this.isDragging = false;
          return;
        }
      },
    });
  }

  _zoomPannelListener() {
    this.canvas.on({
      "mouse:wheel": (opt) => {
        if (this.lockZoom) {
          opt.e.preventDefault();
          opt.e.stopPropagation();
          return;
        }

        const deltaY = opt.e.deltaY;
        const deltaX = opt.e.deltaX;

        if (opt.e.ctrlKey) {
          let zoom = this.canvas.getZoom();
          zoom *= 0.995 ** deltaY;
          if (zoom > MAX_ZOOM) zoom = MAX_ZOOM;
          if (zoom <= MINIMUM_ZOOM) zoom = MINIMUM_ZOOM;

          this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
          this.transformListener(this.canvas.viewportTransform);
        } else {
          let vpt = this.canvas.viewportTransform;
          vpt[4] -= deltaX;
          vpt[5] -= deltaY;

          this.canvas.setViewportTransform(vpt);
          this.transformListener(this.canvas.viewportTransform);
        }

        this.notify("transformListener", this.canvas.viewportTransform);
        this.canvas.requestRenderAll();
        this.canvas.clearContext(this.canvas.contextTop);

        opt.e.preventDefault();
        opt.e.stopPropagation();
      },
    });
  }

  _rotateGroupObjectListener(obj) {
    this.canvas.on("object:rotating", (e) => {
      this.rotateGroupObjectListener(e.target?.angle);
      this.rotatingObject = e.target;
    });
  }

  _objectStateChangeListener() {
    this.canvas.on("object:modified", (e) => {
      if (e.target?.lineData?.isNotSave) {
        return;
      }
      this.objectStateChangeListener();
    });
    this.canvas.on("object:added", (e) => {
      if (e.target?.lineData?.isNotSave) {
        return;
      }
      this.objectStateChangeListener();
    });
  }
  _autoDrawPathCreatedListener() {
    this.canvas.on("autodraw:done", (newInk) => {
      this.ink.push(newInk);
      this.onFinishAutoDrawListener(this.ink);
    });
  }
  listenerAll() {
    this._selectObjectListener();
    this._dragPannelListener();
    this._zoomPannelListener();
    this._rotateGroupObjectListener();
    this._snapToGridOnMoveObjectListener();
    this._deleteObjectListener();
    this._objectStateChangeListener();
    this._handleShortcuts();
    this._autoDrawPathCreatedListener();
  }

  enableDrawingMode() {
    this.canvas.isDrawingMode = true;
    this.isDragMode = false;
    this.canvas.selection = false;
    changeCursor("pencil");
  }
  enableSelectMode() {
    this.canvas.isDrawingMode = true;
    this.isDragMode = false;
    this.canvas.selection = false;
    this.changeBrushType("SELECT");

    console.log("enableFreeStyleSelect");
  }
  enableDragMode() {
    this.isDragMode = true;
    this.canvas.isDrawingMode = false;
    this.canvas.selection = false;
    changeCursor("default");
  }
  changeBrushType(type = BRUSH_TYPE.PENCIL) {
    switch (type) {
      case BRUSH_TYPE.PENCIL: {
        const pencil = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush = pencil;
        this.erasingRemovesErasedObjects = false;
        changeCursor("pencil");
        break;
      }
      case BRUSH_TYPE.HIGHLIGHTER:
        const highlightBrush = new fabric.PencilBrush(this.canvas);
        this.erasingRemovesErasedObjects = false;
        this.canvas.freeDrawingBrush = highlightBrush;
        changeCursor("pencil");

        break;
      case BRUSH_TYPE.CIRCLE:
        this.erasingRemovesErasedObjects = false;
        this.canvas.freeDrawingBrush = new fabric.CircleBrush(this.canvas);
        break;
      case BRUSH_TYPE.ERASER_DEF:
        this.erasingRemovesErasedObjects = false;
        this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
        changeCursor("eraser");
        break;
      case BRUSH_TYPE.ERASER_GROUP:
        this.erasingRemovesErasedObjects = true;
        this.canvas.freeDrawingBrush = new fabric.EraserBrush(this.canvas);
        changeCursor("eraser");
        break;
      case BRUSH_TYPE.PATTERN: {
        this.erasingRemovesErasedObjects = false;
        this.canvas.freeDrawingBrush = new fabric.PatternBrush(this.canvas);
        this.canvas.freeDrawingBrush.opacity = 1;
        changeCursor("pencil");
        break;
      }
      case BRUSH_TYPE.SELECT: {
        const selectBrush = new CustomSelectBrush(this.canvas);
        this.canvas.freeDrawingBrush = selectBrush;
        this.erasingRemovesErasedObjects = false;
        changeCursor("select");
        break;
      }
      case BRUSH_TYPE.AUTO_DRAW: {
        const autoDrawBrush = new AutoDrawBrush(this.canvas);
        this.ink = [];
        this.canvas.freeDrawingBrush = autoDrawBrush;
        this.erasingRemovesErasedObjects = false;
        changeCursor("pencil");
        break;
      }
      default: {
        const pencil = new fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush = pencil;
        changeCursor("default");
        break;
      }
    }
  }

  changePatternStyle(svgString = "") {
    if (!svgString) {
      return;
    }
    const img = new Image();
    img.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

    this.canvas.freeDrawingBrush.source = img;
  }

  changeStrokeDashStyle(array = []) {
    this.canvas.freeDrawingBrush.strokeDashArray = [...array];
  }

  changeBrushWidth(width = 10) {
    this.canvas.freeDrawingBrush.width = width;
  }

  changeSprayBrushDensity(dens = 10) {
    this.canvas.freeDrawingBrush.density = dens;
  }

  changeBrushColor(color = "#FFFFFF") {
    if (typeof color === "string") {
      this.canvas.freeDrawingBrush.color = color;
    } else if (typeof color === "object" && Object.keys(color).length === 4) {
      let colorString = colorObjectToRGBAString(color);
      this.canvas.freeDrawingBrush.color = colorString;
    }
  }

  changeObjectColor(color = "red") {
    let colorString = null;
    if (typeof color === "string") {
      colorString = color;
    } else if (typeof color === "object" && Object.keys(color).length === 4) {
      colorString = colorObjectToRGBAString(color);
    }
    this.selectedObject.forEach((item) => {
      if (!item._objects?.length) {
        item.set("stroke", colorString);
      } else {
        item?._objects?.forEach((ele) => {
          ele.set("fill", colorString);
        });
      }
    });

    this.canvas.renderAll();
  }

  clearCanvas() {
    this.canvas.clear();
  }
  deleteObject() {
    this.selectedObject?.forEach((obj) => {
      this.canvas.remove(obj);
    });
    this.selectedObject = [];
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    this.selectListener([]);
  }
  getImageScaleValue(w, h, devideValue = 4) {
    let screenW = window.innerWidth,
      screenH = window.innerHeight;
    let ratioX =
      w > screenW / devideValue
        ? screenW / devideValue / w
        : w / (screenW / devideValue);
    let ratioY =
      h > screenH / devideValue
        ? screenH / devideValue / h
        : h / (screenH / devideValue);
    return Math.max(ratioX, ratioY);
  }
  getImageScaleValueFitScreen(w, h) {
    let screenW = window.innerWidth,
      screenH = window.innerHeight;
    let ratioX = w > screenW ? screenW / w : w / screenW;
    let ratioY = h > screenH ? screenH / h : h / screenH;
    return Math.max(ratioX, ratioY);
  }
  addImageToBoard(imageSrc, fitToView, devideValue = 4, offsetIndex = 0) {
    var imgObj = new Image();
    imgObj.src = imageSrc;
    imgObj.onload = () => {
      var image = new fabric.Image(imgObj);
      var scaleXY = this.getImageScaleValue(
        imgObj.width,
        imgObj.height,
        devideValue
      );
      if (fitToView) {
        scaleXY = this.getImageScaleValueFitScreen(imgObj.width, imgObj.height);
      }

      image.set({
        height: imgObj.height,
        width: imgObj.width,
        left: 0,
        top: 0,
        scaleX: scaleXY,
        scaleY: scaleXY,
      });
      image.imageData = {
        id: `image-${uuidv4()}`,
      };
      this.centerObjectByViewPort(image);
      image.top -= offsetIndex * 35;
      image.left += offsetIndex * 35;
      this.canvas.add(image);

      this.canvas.setActiveObject(image);
      this.canvas.renderAll();
    };
  }
  addTextField() {
    const placeHolder = "Typing your text..";

    const text = new fabric.IText(placeHolder, {
      width: 200,
      height: 200,
      canvas: this.canvas,
      centeredScaling: true,
    });

    this.centerObjectByViewPort(text);
    this.canvas.add(text).setActiveObject(text);
    text.enterEditing();
    this.canvas.renderAll();

    // var imgObj = new Image();
    // imgObj.src = Notes1;
    // imgObj.onload = () => {
    //   var image = new fabric.Image(imgObj);
    //   image.filters = [
    //     new fabric.Image.filters.Brightness({ brightness: 0.1 }),
    //     new fabric.Image.filters.Contrast({ contrast: 0.37 }),
    //     new fabric.Image.filters.Saturation({ saturation: -0.63 }),
    //     new fabric.Image.filters.HueRotation({ rotation: 0.15 }),
    //   ];
    //   image.applyFilters();
    //   image.width = 432;
    //   image.height = 480;
    //   var group = new fabric.Group([image, text]);
    //   this.canvas.centerObject(group);
    //   this.canvas.add(group);
    //   this.canvas.renderAll();
    // };
  }
  centerObjectByViewPort(object) {
    let viewCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    const vp = this.canvas.viewportTransform;
    const centerPoint = mapCursorPositionToCanvasPosition(viewCenter, vp);
    object.setPositionByOrigin(centerPoint, "center", "center");
    object.setCoords();
  }
  renderSnapLine(x1, y1, x2, y2) {
    var line = new fabric.Path(`M ${x1} ${y1} L ${x2} ${y2} z`);
    line.stroke = "red";
    line.strokeWidth = 1;
    line.selectable = false;
    line.fill = "red";
    line.opacity = 1;
    line.strokeLineCap = "round";
    line.strokeLineJoin = "round";
    line.strokeMiterLimit = 10;
    line.lineData = { isNotSave: true };

    if (!this.listSnapLine.length) {
      this.listSnapLine = [];
    }
    this.listSnapLine.push(line);
    this.canvas.add(line);
    this.canvas.requestRenderAll();
  }
  removeAllSnapLine() {
    if (!this.listSnapLine || !this.listSnapLine?.length) return;
    this.listSnapLine?.forEach((item) => {
      this.canvas.remove(item);
    });
    this.listSnapLine = [];
    this.canvas.requestRenderAll();
  }

  /**
   * Handle shortscuts
   */
  _handleShortcuts = () => {
    addListener(window.document.body, "keydown", (e) => {
      this.handleShortcutDelete(e);
      this.handleShortcutCopy(e);
      this.handleShortcutEsc(e);
      this.handleShortcutPaste(e);
      this.handleShortcutPgUp(e);
      this.handleShortcutPgDn(e);
    });
  };

  /**
   * Handle press key Delete
   * @param {KeyboardEvent} e
   * @param {boolean} force
   */
  handleShortcutDelete(e, force = false) {
    const { altKey, ctrlKey, shiftKey, keyCode } = e;

    if (
      force ||
      (!!this.canvas.getActiveObjects().length &&
        (keyCode === 46 || keyCode === 8) &&
        !ctrlKey &&
        !altKey &&
        !shiftKey)
    ) {
      const objs = this.canvas.getActiveObjects();

      if (objs.length === 1 && objs[0].isType("IText") && objs[0]?.isEditing)
        return;

      this.canvas.getActiveObjects().forEach((obj) => {
        this.canvas.remove(obj);
      });
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  }

  /**
   * handle keyboard shortcuts copy Ctrl + C / Cmd + C
   * @param {KeyboardEvent} e
   * @param {boolean} force
   */
  handleShortcutCopy(e, force) {
    const { ctrlKey, keyCode, metaKey } = e;
    if (
      force ||
      ((ctrlKey || metaKey) &&
        keyCode === 67 &&
        this.canvas.getActiveObjects().length > 0)
    ) {
      this.canvas.getActiveObject().clone((cloned) => {
        this._clipboard = cloned;
      });
    }
  }

  /**
   * handle keyboard shortcuts paste Ctrl + V / Cmd + V
   * @param {KeyboardEvent} e
   */
  handleShortcutPaste(e) {
    const { ctrlKey, keyCode, metaKey } = e;
    if ((ctrlKey || metaKey) && keyCode === 86 && !!this._clipboard) {
      this.canvas.discardActiveObject();

      this._clipboard.set("top", this._clipboard.top + 10);
      this._clipboard.set("left", this._clipboard.left + 10);

      if (this._clipboard.type === "activeSelection") {
        // active selection needs a reference to the canvas.
        this._clipboard.canvas = canvas;
        this._clipboard.forEachObject((obj) => {
          this.canvas.add(obj);
        });
        // this should solve the unselectability
        this._clipboard.setCoords();
      } else {
        this.canvas.add(this._clipboard);
      }

      this.canvas.setActiveObject(this._clipboard);

      this._clipboard.clone((cloned) => {
        this._clipboard = cloned;
      });

      this.canvas.requestRenderAll();
    }
  }

  /**
   * handle keyboard shortcuts Esc
   * @param {KeyboardEvent} e
   */
  handleShortcutEsc(e) {
    const { keyCode } = e;
    if (keyCode === 27 && !!this.canvas.getActiveObjects().length) {
      this.canvas.discardActiveObject();
      this.canvas.requestRenderAll();
    }
  }

  /**
   * handle keyboard shortcuts PgUp
   * @param {KeyboardEvent} e
   * @param {boolean} [force=false] - force check keyCode
   */
  handleShortcutPgUp(e, force = false) {
    const { keyCode } = e;

    if (force || (keyCode === 33 && !!this.canvas.getActiveObjects().length)) {
      this.canvas.getActiveObject().bringToFront();
      this.canvas.bringToFront(this.canvas.getActiveObject());
      this.canvas.requestRenderAll();
    }
  }
  /**
   * handle keyboard shortcuts PgDn
   * @param {KeyboardEvent} e
   * @param {boolean} [force=false] - force check keyCode
   */
  handleShortcutPgDn(e, force = false) {
    const { keyCode } = e;

    if (force || (keyCode === 34 && !!this.canvas.getActiveObjects().length)) {
      this.canvas.sendToBack(this.canvas.getActiveObject());
      console.log("okey");

      this.canvas.renderAll();
    }
  }

  /**
   * @returns { number }
   */
  calcPercentZoom() {
    const zoom = this.canvas.getZoom();
    const percent = Math.round((zoom / MAX_ZOOM) * 100);

    return percent;
  }

  /**
   * Animation zoom
   * @param {number} finalZoom
   * @param {fabric.Point} point
   */
  animateZoomToPoint = (finalZoom, point) => {
    const _this = this;
    const zoom = _this.canvas.getZoom();

    fabric.util.animate({
      startValue: zoom,
      endValue: finalZoom,
      duration: 400,
      easing: fabric.util.ease["easeOutSine"],
      onChange: (valueZoom) => {
        _this.canvas.zoomToPoint(point, valueZoom);

        _this.transformListener(_this.canvas.viewportTransform);

        _this.notify("transformListener", _this.canvas.viewportTransform);
      },
      onComplete: () => {},
    });
  };

  /**
   * @description Animation zoom fit content
   */
  animateZoomFitContent = () => {
    this.canvas.discardActiveObject();
    const objs = this.canvas.getObjects();
    if (!objs.length) return;
    const vptStr = [...this.canvas.viewportTransform];
    const zoom = vptStr[0];
    const duration = 500;

    const selection = new fabric.ActiveSelection(objs, {
      canvas: this.canvas,
    });
    this.canvas.setActiveObject(selection);

    let finalZoomH = this.canvas.height / selection.height - 0.3;
    finalZoomH = finalZoomH <= MINIMUM_ZOOM ? MINIMUM_ZOOM : finalZoomH;
    let finalZoomW = this.canvas.width / selection.width - 0.3;
    finalZoomW = finalZoomW <= MINIMUM_ZOOM ? MINIMUM_ZOOM : finalZoomW;

    const zoomEnd = Math.min(finalZoomH, finalZoomW);

    const panX =
      (this.canvas.width / zoomEnd / 2 - selection.left - selection.width / 2) *
      zoomEnd;
    const panY =
      (this.canvas.height / zoomEnd / 2 -
        selection.top -
        selection.height / 2) *
      zoomEnd;

    let oldX = vptStr[4];
    let oldY = vptStr[5];

    const zoomDif = zoomEnd - zoom;
    const xDiff = panX - oldX;
    const yDiff = panY - oldY;

    this.canvas.discardActiveObject();

    fabric.util.animate({
      startValue: 0,
      endValue: 1,
      duration,
      easing: fabric.util.ease["easeInOutQuad"],
      onChange: (value) => {
        const vpt = [...this.canvas.viewportTransform];
        vpt[4] = oldX + xDiff * value;
        vpt[5] = oldY + yDiff * value;
        vpt[0] = zoom + zoomDif * value;
        vpt[3] = zoom + zoomDif * value;
        this.canvas.setViewportTransform(vpt);
        this.transformListener(vpt);
        this.notify("transformListener", vpt);
      },
      onComplete: () => {
        this.canvas.requestRenderAll();
      },
    });
  };

  /**
   * @description Rotate object on canvas
   * @param {fabric.Object} object
   * @param {fabric.Object['angle']} angle
   */
  rotateObject = (object, angle) => {
    object.centeredRotation = true;
    object.rotate(angle);
    object.setCoords();

    this.canvas.renderAll();
  };
}
