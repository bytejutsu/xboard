import { fabric } from "fabric"
const CustomSprayBrush = fabric.util.createClass(fabric.BaseBrush, {
  opacity: 0.2,
  width: 30,
  density: 20,
  dotWidth: 1,
  dotWidthVariance: 1,
  randomOpacity: false,
  optimizeOverlapping: true,
  touchesPointer: {},
  touchesPath2D: {},
  touchesOldEnds: {},
  touchesPoints: {},
  decimate: 0.4,
  existOneMouseDown: false,
  sprayChunks: {},
  sprayChunkPoints: {},
  color: "#000",

  initialize: function (canvas, opt) {
    var context = this
    opt = opt || {}

    this.canvas = canvas

    this.canvas.contextTop.lineJoin = "round"
    this.canvas.contextTop.lineCap = "round"

    this.sprayChunks = {}
  },
  _resetOverride: function (id) {
    this.sprayChunks[id] = []
    this.sprayChunkPoints[id] = []
  },
  onMouseDown: function (pointer, option) {
    if (!option.id) {
      return
    }
    this._resetOverride(option.id)
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
  _onMouseDownOverride: function (pointer, option) {
    var id = option.id
    this.sprayChunks[id] = []
    this._addSprayChunkOverride(pointer, id)
    this.render(this.sprayChunkPoints[id])
  },
  _onMouseMoveOverride: function (pointer, option) {
    var id = option.id
    if (this.limitedToCanvasSize === true && this._isOutSideCanvas(pointer)) {
      return
    }
    this._addSprayChunkOverride(pointer, id)
    this.render(this.sprayChunkPoints[id])
  },
  _onMouseUpOverride: function (id) {
    var originalRenderOnAddRemove = this.canvas.renderOnAddRemove
    this.canvas.renderOnAddRemove = false
    var rects = []
    for (var i = 0, ilen = this.sprayChunks[id].length; i < ilen; i++) {
      var sprayChunk = this.sprayChunks[id][i]
      for (var j = 0, jlen = sprayChunk.length; j < jlen; j++) {
        var rect = new fabric.Rect({
          width: sprayChunk[j].width,
          height: sprayChunk[j].width,
          left: sprayChunk[j].x + 1,
          top: sprayChunk[j].y + 1,
          originX: "center",
          originY: "center",
          fill: this.color
        })
        rects.push(rect)
      }
    }

    if (this.optimizeOverlapping) {
      rects = this._getOptimizedRects(rects)
    }
    var group = new fabric.Group(rects)
    this.canvas.fire("before:path:created", { path: group })
    this.canvas.add(group)
    this.canvas.fire("path:created", { path: group })
    if (Object.keys(this.touchesPointer).length === 0) {
      this.canvas.clearContext(this.canvas.contextTop)
    }
    this.canvas.renderOnAddRemove = originalRenderOnAddRemove
    this.canvas.requestRenderAll()
    this._resetOverride(id)
  },
  _getOptimizedRects: function (rects) {
    // avoid creating duplicate rects at the same coordinates
    var uniqueRects = {},
      key,
      i,
      len
    for (i = 0, len = rects.length; i < len; i++) {
      key = rects[i].left + "" + rects[i].top
      if (!uniqueRects[key]) {
        uniqueRects[key] = rects[i]
      }
    }
    var uniqueRectsArray = []
    for (key in uniqueRects) {
      uniqueRectsArray.push(uniqueRects[key])
    }
    return uniqueRectsArray
  },
  render: function (sprayChunk) {
    var ctx = this.canvas.contextTop,
      i,
      len
    ctx.fillStyle = this.color
    this._saveAndTransformOverride(ctx)
    ctx.globalAlpha = 1
    for (i = 0, len = sprayChunk.length; i < len; i++) {
      var point = sprayChunk[i]
      ctx.fillRect(point.x, point.y, point.width, point.width)
    }
    ctx.restore()
  },

  _render: function () {
    return
    var ctx = this.canvas.contextTop,
      i,
      ilen
    ctx.fillStyle = this.color
    this._saveAndTransformOverride(ctx)
    for (i = 0, ilen = this.sprayChunks.length; i < ilen; i++) {
      this.render(this.sprayChunks[i])
    }
    ctx.restore()
  },
  _addSprayChunkOverride: function (pointer, id) {
    this.sprayChunkPoints[id] = []
    var x,
      y,
      width,
      radius = this.width / 2,
      i
    for (i = 0; i < this.density; i++) {
      x = fabric.util.getRandomInt(pointer.x - radius, pointer.x + radius)
      y = fabric.util.getRandomInt(pointer.y - radius, pointer.y + radius)

      if (this.dotWidthVariance) {
        width = fabric.util.getRandomInt(
          Math.max(1, this.dotWidth - this.dotWidthVariance),
          this.dotWidth + this.dotWidthVariance
        )
      } else {
        width = this.dotWidth
      }
      var point = new fabric.Point(x, y)
      point.width = width

      if (this.randomOpacity) {
        point.opacity = fabric.util.getRandomInt(0, 100) / 100
      }

      this.sprayChunkPoints[id].push(point)
    }

    this.sprayChunks[id].push(this.sprayChunkPoints[id])
  },
  _saveAndTransformOverride: function (ctx) {
    var v = this.canvas.viewportTransform
    ctx.save()
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5])
  }
})
export default CustomSprayBrush
