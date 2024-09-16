import { fabric } from "fabric"
const CustomStraigtBrush = fabric.util.createClass(fabric.BaseBrush, {
  opacity: 0.2,
  width: 10,
  color: "#000",
  strokeDashArray: [],
  brush: null,
  touchesPointer: {},
  touchesPath2D: {},
  touchesOldEnds: {},
  touchesPoints: {},
  decimate: 0.4,
  existOneMouseDown: false,
  drawStraightLine: false,
  strokeLineJoin: "round",
  strokeLineCap: "round",

  initialize: function (canvas, opt) {
    opt = opt || {}
    this.canvas = canvas
    this._resetOverride()
  },

  changeOpacity: function (value) {
    let alp = parseFloat(this.color.split(",")[3])
    this.canvas.contextTop.globalAlpha = isNaN(alp) ? 1 : alp
    this.opacity = value
    // this.canvas.contextTop.globalAlpha = 1
  },

  _setBrushStylesOverride: function () {
    const ctx = this.canvas.contextTop
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.width
    ctx.lineCap = this.strokeLineCap
    ctx.miterLimit = this.strokeMiterLimit
    ctx.lineJoin = this.strokeLineJoin
    ctx.setLineDash(this.strokeDashArray || [])
    let alp = parseFloat(this.color.split(",")[3])
    ctx.globalAlpha = isNaN(alp) ? 1 : alp
    // ctx.globalAlpha = 1
  },

  onMouseDown: function (pointer, option) {
    if (!option.id) return
    this._onMouseDownOverride(pointer, option)
  },

  onMouseMove: function (pointer, option) {
    if (!option.id) {
      return
    }
    this._onMouseMoveOverride(pointer, option)
  },

  onMouseUp: function (id) {
    if (typeof id == "string") {
      delete this.touchesPointer[id]
      this._onMouseUpOverride(id)
    }
  },

  _reset: function () {
    this._drips.length = 0
    this._point = null
    this._lastPoint = null
  },

  _movePathTo: function (id, x, y) {
    var currentPath = this.touchesPath2D[id]
    if (!currentPath) {
      currentPath = new Path2D()
      currentPath.width = this.width
      currentPath.fill = this.color
      currentPath.moveTo(x, y)
      this.touchesPath2D[id] = currentPath
    }
    this.canvas.contextTop.stroke(currentPath)
  },
  _addPointOverride: function (id, point) {
    var currentPoints = this.touchesPoints[id] || []
    if (
      currentPoints?.length > 1 &&
      point.eq(currentPoints[currentPoints.length - 1])
    ) {
      return false
    }
    if (this.drawStraightLine && currentPoints.length > 1) {
      this._hasStraightLine = true
      currentPoints.pop()
    }
    currentPoints.push(point)
    this.touchesPoints[id] = currentPoints
    return true
  },
  _resetOverride: function (id) {
    this._setBrushStylesOverride()
    this.touchesPoints[id] = []
    this.touchesPath2D[id] = null
  },
  _prepareForDrawingOverride: function (id, pointer) {
    var p = new fabric.Point(pointer.x, pointer.y)
    this._resetOverride(id)
    this._addPointOverride(id, p)
    this._movePathTo(id, p.x, p.y)
  },
  _captureDrawingPathOverride: function (id, pointer) {
    var pointerPoint = new fabric.Point(pointer.x, pointer.y)
    return this._addPointOverride(id, pointerPoint)
  },
  _renderOverride: function (ctx, id) {
    var currentPoints = this.touchesPoints[id]
    var i,
      len,
      p1 = currentPoints[0],
      p2 = currentPoints[1]
    ctx = ctx || this.canvas.contextTop
    this._saveAndTransformOverride(ctx)
    var currentPath = this.touchesPath2D[id] || new Path2D()

    if (currentPoints.length === 2 && p1.x === p2.x && p1.y === p2.y) {
      var width = this.width / 1000
      p1 = new fabric.Point(p1.x, p1.y)
      p2 = new fabric.Point(p2.x, p2.y)
      p1.x -= width
      p2.x += width
    }
    currentPath.moveTo(p1.x, p1.y)

    for (i = 1, len = currentPoints.length; i < len; i++) {
      this._drawSegmentOverride(ctx, p1, p2)
      p1 = currentPoints[i]
      p2 = currentPoints[i + 1]
    }

    ctx.strokeStyle = this.color
    ctx.fill = this.color
    console.log("COLOR", this.color)
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.width
    ctx.lineCap = this.strokeLineCap
    ctx.miterLimit = this.strokeMiterLimit
    ctx.lineJoin = this.strokeLineJoin
    currentPath.lineTo(p1.x, p1.y)
    ctx.stroke(currentPath)
    ctx.restore()
  },

  _saveAndTransformOverride: function (ctx) {
    var v = this.canvas.viewportTransform
    ctx.save()
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5])
  },

  _drawSegmentOverride: function (ctx, p1, p2) {
    var midPoint = p1.midPointFrom(p2)
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
    return midPoint
  },

  _onMouseDownOverride: function (pointer, options) {
    var id = options.id
    this._prepareForDrawingOverride(id, pointer)
    this._captureDrawingPathOverride(id, pointer)
  },
  _needsFullRender: function () {
    return false
  },
  _onMouseMoveOverride: function (pointer, options) {
    var id = options.id
    var currentPoints = this.touchesPoints[id]
    if (
      this._captureDrawingPathOverride(id, pointer) &&
      currentPoints.length > 1
    ) {
      if (this._needsFullRender()) {
        // redraw curve
        // clear top canvas
        this.canvas.clearContext(this.canvas.contextTop)
        this._renderOverride(null, id)
      } else {
        var points = currentPoints,
          length = points.length,
          ctx = this.canvas.contextTop

        this._saveAndTransformOverride(ctx)
        var currentOldEnd = this.touchesOldEnds[id]
        var currentPath = this.touchesPath2D[id]
        if (currentOldEnd) {
          currentPath.moveTo(currentOldEnd.x, currentOldEnd.y)
        }
        currentOldEnd = this.touchesOldEnds[id] = this._drawSegmentOverride(
          currentPath,
          points[length - 2],
          points[length - 1],
          true
        )

        let alp = parseFloat(this.color.split(",")[3])
        ctx.globalAlpha = isNaN(alp) ? 1 : alp
        ctx.strokeStyle = this.color
        ctx.stroke(currentPath)
        ctx.restore()
      }
    }
  },
  _onMouseUpOverride: function (id) {
    this.touchesOldEnds[id] = undefined
    this.drawStraightLine = false
    this._finalizeAndAddPathOverride(id)
    return false
  },
  _convertPointsToSVGPathOverride: function (points = []) {
    if (points.length < 2) {
      var correction = this.width / 1000
      return fabric.util.getSmoothPathFromPoints(points, correction)
    } else {
      let start = points[0]
      let end = points[points.length - 1]
      return [
        ["M", start.x, start.y],
        ["L", end.x, end.y]
      ]
    }
  },
  _decimatePointsOverride: function (points, distance) {
    if (points.length <= 2) {
      return points
    }
    var zoom = this.canvas.getZoom(),
      adjustedDistance = Math.pow(distance / zoom, 2),
      i,
      l = points.length - 1,
      lastPoint = points[0],
      newPoints = [lastPoint],
      cDistance
    for (i = 1; i < l - 1; i++) {
      cDistance =
        Math.pow(lastPoint.x - points[i].x, 2) +
        Math.pow(lastPoint.y - points[i].y, 2)
      if (cDistance >= adjustedDistance) {
        lastPoint = points[i]
        newPoints.push(lastPoint)
      }
    }

    newPoints.push(points[l])
    return newPoints
  },
  _isEmptySVGPath: function (pathData) {
    var pathString = fabric.util.joinPath(pathData)
    return pathString === "M 0 0 Q 0 0 0 0 L 0 0"
  },
  _createPathOverride: function (pathData) {
    var path = new fabric.Path(pathData, {
      fill: null,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeMiterLimit: this.strokeMiterLimit,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray,
      id: Date.now()
    })

    return path
  },
  _finalizeAndAddPathOverride: function (id) {
    var ctx = this.touchesPath2D[id]
    var currentPath = this.touchesPath2D[id]
    ctx.closePath()
    currentPath.closePath()
    var currentPoints = this.touchesPoints[id]
    if (this.decimate) {
      currentPoints = this._decimatePointsOverride(currentPoints, this.decimate)
    }
    var pathData = this._convertPointsToSVGPathOverride(currentPoints)

    if (this._isEmptySVGPath(pathData)) {
      this.canvas.requestRenderAll()
      return
    }

    var path = this._createPathOverride(pathData)
    if (Object.keys(this.touchesPointer).length === 0) {
      this.canvas.clearContext(this.canvas.contextTop)
    }
    this.canvas.fire("before:path:created", { path: path })
    this.canvas.add(path)
    this.canvas.requestRenderAll()
    path.setCoords()
    this.canvas.fire("path:created", { path: path })
  }
})
export default CustomStraigtBrush
