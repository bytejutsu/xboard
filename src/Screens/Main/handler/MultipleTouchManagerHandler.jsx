import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BRUSH_TYPE } from "../drawcore/TBoardDraw";
import { mapCursorPositionToCanvasPosition } from "../../../utils/position";
import {
  getGlobalMountedSelector,
  getBrushTypeSelector,
  getIsViewModeSelector,
  getIsDrawModeSelector,
} from "../../../Store/draw/selectors";
import { setForceClosePopOver } from "../../../Store/draw";

const MultipleTouchManagerHandler = ({ canvas }) => {
  const pixelRatio = 1;
  // window.devicePixelRatio ||
  // window.webkitDevicePixelRatio ||
  // window.mozDevicePixelRatio ||
  // window.msDevicePixelRatio ||
  // 1
  // const onTouchStart = (e) => {
  //   dispatch(setForceClosePopOver(Date.now()))
  //   Object.values(e.changedTouches)?.forEach((item) => {
  //     var canvasTransform = canvas.current.canvas.viewportTransform
  //     const pointer = mapCursorPositionToCanvasPosition(
  //       {
  //         x: item.clientX,
  //         y: item.clientY
  //       },
  //       canvasTransform
  //     )
  //     pointer.x *= pixelRatio
  //     pointer.y *= pixelRatio
  //     canvas.current.canvas.freeDrawingBrush.onMouseDown(pointer, {
  //       e: item,
  //       pointer: pointer,
  //       id: `${item.identifier}`
  //     })
  //     canvas.current.canvas.freeDrawingBrush.touchesPointer[
  //       `${item.identifier}`
  //     ] = `${item.identifier}`
  //     touchesPointer.current[`${item.identifier}`] = `${item.identifier}`
  //   })
  // }
  // const onTouchMove = (e) => {
  //   Object.values(e.changedTouches)?.forEach((item) => {
  //     if (!touchesPointer.current[`${item.identifier}`]) {
  //       return
  //     }
  //     var canvasTransform = canvas.current.canvas.viewportTransform
  //     const pointer = mapCursorPositionToCanvasPosition(
  //       {
  //         x: item.clientX,
  //         y: item.clientY
  //       },
  //       canvasTransform
  //     )
  //     pointer.x *= pixelRatio
  //     pointer.y *= pixelRatio
  //     canvas.current.canvas.freeDrawingBrush.onMouseMove(pointer, {
  //       e: item,
  //       pointer: pointer,
  //       id: `${item.identifier}`
  //     })
  //   })
  // }
  // const onTouchStop = (e) => {
  //   Object.values(e.changedTouches).forEach((item) => {
  //     if (touchesPointer.current[`${item.identifier}`]) {
  //       canvas.current.canvas.freeDrawingBrush.onMouseUp(`${item.identifier}`)
  //       delete touchesPointer.current[`${item.identifier}`]
  //     }
  //   })
  // }

  // const onMouseDown = (item) => {
  //   dispatch(setForceClosePopOver(Date.now()))
  //   idRef.current = "999"
  //   var canvasTransform = canvas.current.canvas.viewportTransform
  //   const pointer = mapCursorPositionToCanvasPosition(
  //     {
  //       x: item.clientX,
  //       y: item.clientY
  //     },
  //     canvasTransform
  //   )

  //   pointer.x *= pixelRatio
  //   pointer.y *= pixelRatio

  //   canvas.current.canvas.freeDrawingBrush.onMouseDown(pointer, {
  //     e: item,
  //     pointer: pointer,
  //     id: idRef.current
  //   })
  //   canvas.current.canvas.freeDrawingBrush.touchesPointer[idRef.current] =
  //     idRef.current
  //   touchesPointer.current[idRef.current] = idRef.current
  // }
  // const onMouseMove = (item) => {
  //   if (!idRef.current) {
  //     return
  //   }
  //   var canvasTransform = canvas.current.canvas.viewportTransform
  //   const pointer = mapCursorPositionToCanvasPosition(
  //     {
  //       x: item.clientX,
  //       y: item.clientY
  //     },
  //     canvasTransform
  //   )

  //   pointer.x *= pixelRatio
  //   pointer.y *= pixelRatio
  //   canvas.current.canvas.freeDrawingBrush.onMouseMove(pointer, {
  //     e: item,
  //     pointer: pointer,
  //     id: idRef.current
  //   })
  // }
  // const onMouseUp = (item) => {
  //   canvas.current.canvas.freeDrawingBrush.onMouseUp(idRef.current)
  //   delete touchesPointer.current[idRef.current]
  //   idRef.current = null
  // }

  // React.useEffect(() => {
  //   if (!mounted) {
  //     return
  //   }
  //   if (!supportMultipleTouch || !isDrawMode) {
  //     const ele = document.querySelector(".upper-canvas")
  //     if (!ele) return
  //     ele.removeEventListener("touchstart", onTouchStart)
  //     ele.removeEventListener("touchmove", onTouchMove)
  //     ele.removeEventListener("touchend", onTouchStop)

  //     ele.removeEventListener("mousedown", onMouseDown)
  //     ele.removeEventListener("mousemove", onMouseMove)
  //     ele.removeEventListener("mouseup", onMouseUp)
  //     return
  //   }

  //   const ele = document.querySelector(".upper-canvas")
  //   if (!ele) return
  //   ele.addEventListener("touchstart", onTouchStart)
  //   ele.addEventListener("mousedown", onMouseDown)
  //   ele.addEventListener("touchmove", onTouchMove)
  //   ele.addEventListener("mousemove", onMouseMove)
  //   ele.addEventListener("touchend", onTouchStop)
  //   ele.addEventListener("mouseup", onMouseUp)

  //   return () => {
  //     ele.removeEventListener("touchstart", onTouchStart)
  //     ele.removeEventListener("touchmove", onTouchMove)
  //     ele.removeEventListener("touchend", onTouchStop)

  //     ele.removeEventListener("mousedown", onMouseDown)
  //     ele.removeEventListener("mousemove", onMouseMove)
  //     ele.removeEventListener("mouseup", onMouseUp)
  //   }
  // }, [supportMultipleTouch, mounted, isViewMode, isDrawMode])

  return null;
};
export default MultipleTouchManagerHandler;
