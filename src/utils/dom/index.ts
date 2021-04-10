export const isInside = (
  element: HTMLElement,
  coordinate: { left: number; right?: number; top: number; bottom?: number }
) => {
  const { left, right, bottom, top } = element.getBoundingClientRect();
  // if bottom and right not exist then it's a point
  if (!coordinate.right || !coordinate.bottom) {
    if (coordinate.left > right || coordinate.left < left) {
      return false;
    }

    if (coordinate.top > bottom || coordinate.top < top) {
      return false;
    }
  } else {
    if (
      coordinate.left < left ||
      coordinate.top < top ||
      coordinate.right! > right ||
      coordinate.bottom! > bottom
    ) {
      return false;
    }
  }

  return true;
};

export const getOverflowAdjust = (
  element: HTMLElement,
  coordinate: { left: number; right: number; top: number; bottom: number }
) => {
  const { left, right, bottom, top } = element.getBoundingClientRect();

  let horizontallyAdjustable = true;
  let verticallyAdjustable = true;
  let leftAdjust = 0;
  let topAdjust = 0;

  // check if it's possible to accomodate horizontally
  if (
    (coordinate.left < left && coordinate.right > right) ||
    (coordinate.left > left && coordinate.right < right)
  ) {
    horizontallyAdjustable = false;
  }

  // check if it's possible to accomodate vertically
  if (
    (coordinate.top < top && coordinate.bottom > bottom) ||
    (coordinate.top > top && coordinate.bottom < bottom)
  ) {
    verticallyAdjustable = false;
  }

  if (verticallyAdjustable) {
    // above the level, push it down
    if (coordinate.top < top) {
      topAdjust = top - coordinate.top;
    } else {
      // below the level, push it up, that's why negative value
      topAdjust = bottom - coordinate.bottom;
    }
  }

  if (horizontallyAdjustable) {
    // towards the left, push it right
    if (coordinate.left < left) {
      leftAdjust = left - coordinate.left;
    } else {
      // towards the right, push it left
      leftAdjust = right - coordinate.right;
    }
  }

  return { left: leftAdjust, top: topAdjust };
};
