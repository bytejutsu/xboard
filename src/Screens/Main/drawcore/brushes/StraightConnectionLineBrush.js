const ConnectionLineBrush = fabric.util.createClass(fabric.BaseBrush, {
  type: "straight-connection-line",
  points: [],
  initialize: function (canvas) {
    this.canvas = canvas;
  },
  _render: function (pointEnd) {
    var ctx = ctx || this.canvas.contextTop;
    this._saveAndTransform(ctx);
    ctx.beginPath();
    var startPoint = this.points[0];
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(pointEnd.x, pointEnd.y);
    ctx.stroke();
    ctx.restore();
  },
  onMouseDown: function (pointer) {
    this.points.push(pointer);
  },
  onMouseMove: function (e) {
    this.canvas.clearContext(this.canvas.contextTop);
    this._render(e);
  },
  onMouseUp: function (e) {},
});
export default ConnectionLineBrush;
