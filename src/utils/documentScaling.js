const STANDARD_WIDTH = 1920;
const MIN_SCALE = 0.66;

export const getScaleCoefficient = () => {
  let scale = window.screen.availWidth / STANDARD_WIDTH;
  scale = Math.round(scale * 100) / 100;
  return scale < MIN_SCALE ? MIN_SCALE : scale;
};

const shouldScale = () => {
  const bodyWidth = Math.round(document.body.getBoundingClientRect().width);
  return window.innerWidth === bodyWidth && getScaleCoefficient() !== 1;
};

export const getScaledSize = (value) => {
  if (shouldScale()) {
    return value / getScaleCoefficient();
  }
  return value;
};

export const getScaledProp = (value) => {
  if (shouldScale()) {
    return value * getScaleCoefficient();
  }
  return value;
};
