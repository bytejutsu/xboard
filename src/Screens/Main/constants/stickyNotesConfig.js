import { fabric } from "fabric";
export default STICKY_NOTES_CONFIG = [
  {
    id: 1,
    config: [
      new fabric.Image.filters.HueRotation({ rotation: 0 }),
      new fabric.Image.filters.Saturation({ saturation: -1 }),
      new fabric.Image.filters.Contrast({ contrast: -0.25 }),
    ],
  },
  {
    id: 1,
    config: [
      new fabric.Image.filters.Brightness({ brightness: 0.1 }),
      new fabric.Image.filters.Contrast({ contrast: 0.5 }),
      new fabric.Image.filters.Saturation({ saturation: -0.72 }),
      new fabric.Image.filters.HueRotation({ rotation: 0.3 }),
    ],
  },
  {
    id: 1,
    config: [
      new fabric.Image.filters.Brightness({ brightness: 0.1 }),
      new fabric.Image.filters.Contrast({ contrast: 0.37 }),
      new fabric.Image.filters.Saturation({ saturation: -0.63 }),
      new fabric.Image.filters.HueRotation({ rotation: 0.15 }),
    ],
  },
];
