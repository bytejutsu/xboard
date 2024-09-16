export const TOOL_BAR_AREA_THIN = 50
export const TOOL_BAR_EDGE_SPACING = 20

export const caculateDragAreaLayout = () => {
  let topSide = { x: 0, y: 0, w: 0, h: 0 }
  let bottomSide = { x: 0, y: 0, w: 0, h: 0 }
  let leftSide = { x: 0, y: 0, w: 0, h: 0 }
  let rightSide = { x: 0, y: 0, w: 0, h: 0 }

  topSide.x = window.innerWidth * 0.1
  topSide.y = TOOL_BAR_EDGE_SPACING
  topSide.w = window.innerWidth * 0.8
  topSide.h = TOOL_BAR_AREA_THIN

  bottomSide.x = window.innerWidth * 0.1
  bottomSide.y = window.innerHeight - TOOL_BAR_AREA_THIN - TOOL_BAR_EDGE_SPACING
  bottomSide.w = window.innerWidth * 0.8
  bottomSide.h = TOOL_BAR_AREA_THIN

  leftSide.x = TOOL_BAR_EDGE_SPACING
  leftSide.y = window.innerHeight * 0.1
  leftSide.w = TOOL_BAR_AREA_THIN
  leftSide.h = window.innerHeight * 0.8

  rightSide.x = window.innerWidth - TOOL_BAR_AREA_THIN - TOOL_BAR_EDGE_SPACING
  rightSide.y = window.innerHeight * 0.1
  rightSide.w = TOOL_BAR_AREA_THIN
  rightSide.h = window.innerHeight * 0.8

  return {
    topSide,
    bottomSide,
    leftSide,
    rightSide,
  }
}
export const isAreaContainPoint = (
  area = { x: 0, y: 0, w: 0, h: 0 },
  point = { x: 0, y: 0 }
) => {
  return (
    point.x >= area.x &&
    point.x <= area.x + area.w &&
    point.y >= area.y &&
    point.y <= area.y + area.h
  )
}
export const getToolbarLayoutDim = (
  toolbarThin,
  toolbarLength,
  area = "bottom"
) => {
  const screenW = window.innerWidth,
    screenH = window.innerHeight,
    maxXLength = window.innerWidth * 0.8,
    maxYLength = window.innerHeight * 0.8
  let x = 0,
    y = 0,
    w = toolbarLength,
    h = toolbarThin
  switch (area) {
    case "top": {
      if (toolbarLength >= maxXLength) {
        w = maxXLength
      } else {
        w = toolbarLength
      }
      h = toolbarThin
      x = (screenW - w) / 2
      y = TOOL_BAR_EDGE_SPACING
      break
    }
    case "bottom": {
      if (toolbarLength >= maxXLength) {
        w = maxXLength
      } else {
        w = toolbarLength
      }
      h = toolbarThin
      x = (screenW - w) / 2
      y = screenH - toolbarThin - TOOL_BAR_EDGE_SPACING
      break
    }

    case "left": {
      if (toolbarLength >= maxYLength) {
        h = maxYLength
      } else {
        h = toolbarLength
      }
      w = toolbarThin
      x = TOOL_BAR_EDGE_SPACING
      y = (screenH - h) / 2
      break
    }
    case "right": {
      if (toolbarLength >= maxYLength) {
        h = maxYLength
      } else {
        h = toolbarLength
      }
      w = toolbarThin
      x = screenW - toolbarThin - TOOL_BAR_EDGE_SPACING
      y = (screenH - h) / 2
      break
    }
    default: {
      break
    }
  }
  return {
    x,
    y,
    w,
    h,
  }
}
