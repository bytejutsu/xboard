export const convertTransformMatrix = (transform = [0, 0, 0, 0, 0, 0]) => {
  if (!transform || transform.length !== 6) {
    return {
      zoom: 0,
      x: 0,
      y: 0,
    };
  }
  const zoom = transform[0] || transform[3];
  const x = transform[4];
  const y = transform[5];
  return {
    zoom,
    x,
    y,
  };
};
export const mapCursorPositionToCanvasPosition = (
  cursor = { x: 0, y: 0 },
  canvasTransform = []
) => {
  const { x, y, zoom } = convertTransformMatrix(canvasTransform);
  return {
    x: cursor.x / zoom - x / zoom,
    y: cursor.y / zoom - y / zoom,
  };
};
export const getImageScaleValue = (w, h, devideValue = 4) => {
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
};
