import * as rectColor from "react-color";

/**
 * @param {HTMLInputElement} e
 * @returns
 */
export const preventInputString = (e) => {
  const charStr = String.fromCharCode(e.keyCode);

  const regex = /^[0-9]+|[\b]+$/;

  if (regex.test(charStr)) {
    return false;
  }
  e.preventDefault();
};

/**
 * @param {rectColor.ColorResult['rgb']} color
 * @returns {string}
 */
export const getStringRGBA = (color) => {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
};
