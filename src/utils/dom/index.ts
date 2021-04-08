import * as React from "react";

export const isInside = (
  element: React.RefObject<HTMLElement>,
  { x, y }: { x: number; y: number }
) => {
  const { left, right, bottom, top } = element.current!.getBoundingClientRect();

  if (x > right || x < left) {
    return false;
  }

  if (y > bottom || y < top) {
    return false;
  }

  return true;
};
