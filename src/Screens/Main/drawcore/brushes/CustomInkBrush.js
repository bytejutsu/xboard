import { fabric } from "fabric"

const getRandom = function (max, min) {
  min = min ? min : 0
  return Math.random() * ((max ? max : 1) - min) + min
}
const Stroke = fabric.util.createClass(fabric.Object, {
  color: null,
  inkAmount: null,
  lineWidth: null,

  _point: null,
  _lastPoint: null,
  _currentLineWidth: null,

  initialize: function (ctx, pointer, range, color, lineWidth, inkAmount) {
    var rx = getRandom(range),
      c = getRandom(Math.PI * 2),
      c0 = getRandom(Math.PI * 2),
      x0 = rx * Math.sin(c0),
      y0 = (rx / 2) * Math.cos(c0),
      cos = Math.cos(c),
      sin = Math.sin(c)

    this.ctx = ctx
    this.color = color
    this._point = new fabric.Point(
      pointer.x + x0 * cos - y0 * sin,
      pointer.y + x0 * sin + y0 * cos
    )
    this.lineWidth = lineWidth
    this.inkAmount = inkAmount
    this._currentLineWidth = lineWidth

    ctx.lineCap = "round"
  },

  update: function (pointer, subtractPoint, distance) {
    this._lastPoint = fabric.util.object.clone(this._point)
    this._point = this._point.addEquals({
      x: subtractPoint.x,
      y: subtractPoint.y
    })
    var n = this.inkAmount / (distance + 1),
      per = n > 0.3 ? 0.3 : n < 0 ? 0 : n

    this._currentLineWidth = this.lineWidth * per
  },

  draw: function () {
    var ctx = this.ctx
    ctx.save()
    this.line(
      ctx,
      this._lastPoint,
      this._point,
      this.color,
      this._currentLineWidth
    )
    ctx.restore()
  },

  line: function (ctx, point1, point2, color, lineWidth) {
    ctx.setLineDash([])
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(point1.x, point1.y)
    ctx.lineTo(point2.x, point2.y)
    ctx.stroke()
  }
})
const CustomInkBrush = fabric.util.createClass(fabric.BaseBrush, {
  color: "#000",
  opacity: 1,
  width: 30,

  _baseWidth: 20,
  _inkAmount: 7,
  _lastPoint: null,
  _point: null,
  _range: 10,
  _strokes: null,

  touchesPointer: {},
  touchesPath2D: {},
  touchesOldEnds: {},
  touchesPoints: {},

  initialize: function (canvas, opt) {
    opt = opt || {}

    this.canvas = canvas
    this.width = opt.width || canvas.freeDrawingBrush.width
    this.color = opt.color || canvas.freeDrawingBrush.color
    this.opacity = opt.opacity || canvas.contextTop.globalAlpha

    this._point = new fabric.Point()
  },

  _render: function (pointer) {
    var len,
      i,
      point = this.setPointer(pointer),
      subtractPoint = point.subtract(this._lastPoint),
      distance = point.distanceFrom(this._lastPoint),
      stroke

    for (i = 0, len = this._strokes.length; i < len; i++) {
      if (i == 0) {
        stroke = this._strokes[i]
        stroke.update(point, subtractPoint, distance)
        stroke.draw()
      }
    }

    // if (distance > 30) {
    //   this.drawSplash(point, this._inkAmount)
    // }
  },

  onMouseDown: function (pointer) {
    this.canvas.contextTop.globalAlpha = this.opacity
    this._resetTip(pointer)
  },

  onMouseMove: function (pointer) {
    if (this.canvas._isCurrentlyDrawing) {
      this._render(pointer)
    }
  },

  onMouseUp: function () {
    // this.convertToImg()
    this.canvas.contextTop.globalAlpha = 1
  },

  drawSplash: function (pointer, maxSize) {
    var c,
      r,
      i,
      point,
      ctx = this.canvas.contextTop,
      num = getRandom(12),
      range = maxSize * 10,
      color = this.color

    ctx.save()
    for (i = 0; i < num; i++) {
      r = getRandom(range, 1)
      c = getRandom(Math.PI * 2)
      point = new fabric.Point(
        pointer.x + r * Math.sin(c),
        pointer.y + r * Math.cos(c)
      )

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(point.x, point.y, getRandom(maxSize) / 2, 0, Math.PI * 2, false)
      ctx.fill()
    }
    ctx.restore()
  },

  setPointer: function (pointer) {
    var point = new fabric.Point(pointer.x, pointer.y)

    this._lastPoint = fabric.util.object.clone(this._point)
    this._point = point

    return point
  },

  _resetTip: function (pointer) {
    var len,
      i,
      point = this.setPointer(pointer)

    this._strokes = []
    this.size = this.width / 5 + this._baseWidth
    this._range = this.size / 2

    for (i = 0, len = this.size; i < len; i++) {
      this._strokes[i] = new Stroke(
        this.canvas.contextTop,
        point,
        this._range,
        this.color,
        this.width,
        this._inkAmount
      )
    }
  }
})
export default CustomInkBrush
