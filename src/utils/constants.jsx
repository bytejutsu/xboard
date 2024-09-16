export const CUSTOM_EXPORT_FIELD = ["mathData", "imageData"]; // CUS
export const BOARD_BACKGROUND_TYPE = {
  GRID: "GRID",
  DOT: "DOT",
  LINE: "LINE",
  IMAGE: "IMAGE",
  SOLID: "SOLID",
};

export const HEIGHT_HEADER = 0;

export const DEFAULT_PEN_COLOR = [
  { r: 255, g: 255, b: 255, a: 1 },
  { r: 254, g: 244, b: 69, a: 1 },
  { r: 250, g: 199, b: 16, a: 1 },
  { r: 242, g: 71, b: 38, a: 1 },
  { r: 230, g: 230, b: 230, a: 1 },
  { r: 206, g: 231, b: 65, a: 1 },
  { r: 143, g: 209, b: 79, a: 1 },
  { r: 218, g: 0, b: 99, a: 1 },
  { r: 128, g: 128, b: 128, a: 1 },
  { r: 18, g: 205, b: 212, a: 1 },
  { r: 12, g: 167, b: 137, a: 1 },
  { r: 101, g: 44, b: 179, a: 1 },
  { r: 26, g: 26, b: 26, a: 1 },
  { r: 45, g: 155, b: 240, a: 1 },
  { r: 65, g: 75, b: 178, a: 1 },
  { r: 149, g: 16, b: 172, a: 1 },
  { r: 111, g: 108, b: 73, a: 1 },
];

export const MAX_ZOOM = 4,
  MINIMUM_ZOOM = MAX_ZOOM * 0.01; /// 0.01 is mean 1%

export const BOARD_MAX_Y = 400,
  BOARD_MIN_Y = -400;
export const BOARD_MAX_X = 400,
  BOARD_MIN_X = -400;
export const DEFAULT_VIEW_PORT = [1.5, 0, 0, 1.5, 0, 0];

export const FONTS = [
  {
    label: <span style={{ fontFamily: "sans-serif" }}>Sans serif</span>,
    value: "sans-serif",
  },
  {
    label: (
      <span style={{ fontFamily: "Times New Roman, sans-serif" }}>
        Times New Roman
      </span>
    ),
    value: "Times New Roman",
  },
  {
    label: (
      <span style={{ fontFamily: "Be Vietnam Pro, sans-serif" }}>
        Be Vietnam Pro
      </span>
    ),
    value: "Be Vietnam Pro",
  },
  {
    label: <span style={{ fontFamily: "Phudu, sans-serif" }}>Phudu</span>,
    value: "Phudu",
  },
  {
    label: <span style={{ fontFamily: "Roboto, sans-serif" }}>Roboto</span>,
    value: "Roboto",
  },
  {
    label: <span style={{ fontFamily: "Anton, sans-serif" }}>Anton</span>,
    value: "Anton",
  },
  {
    label: (
      <span style={{ fontFamily: "Dancing Script, sans-serif" }}>
        Dancing Script
      </span>
    ),
    value: "Dancing Script",
  },
  {
    label: (
      <span style={{ fontFamily: "Josefin Sans, sans-serif" }}>
        Josefin Sans
      </span>
    ),
    value: "Josefin Sans",
  },
];
