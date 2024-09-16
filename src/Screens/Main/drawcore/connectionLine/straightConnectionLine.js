const ConnectionLine = fabric.util.createClass(fabric.Group, {
  type: "straight-connection-line",
  points: [],
  edges: [],
  initialize: function (canvas, points) {
    this.canvas = canvas;
    this.points = points;
  },
  _generatePoints: function (listPoints = []) {
    if (!listPoints || !listPoints.length) {
      return;
    }
    listPoints.forEach((point) => {});
  },
  _render: function () {},
  onMouseDown: function (pointer) {
    this.points.push(pointer);
  },
  onMouseMove: function (e) {
    this.canvas.clearContext(this.canvas.contextTop);
    this._render(e);
  },
  onMouseUp: function (pointer) {},
});
export default ConnectionLine;
