export function getXPos(radians, radius) {
  return radius * Math.sin(radians);
}

export function getYPos(radians, radius) {
  return radius * (Math.cos(radians));
}
