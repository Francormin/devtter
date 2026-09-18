export const addOpacityToColor = (color, opacity) => {
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${color}${opacityHex}`;
};
