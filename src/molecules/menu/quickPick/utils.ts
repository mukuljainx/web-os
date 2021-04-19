export const getPositionIndex = (pos: number) => {
  const col = pos % 3;
  const row = Math.floor(pos / 3);

  return { row, col };
};

export const getPosition = ({ row, col }: { row: number; col: number }) => {
  return {
    x: col * 120 + (col === 0 ? 0 : 8 * col),
    y: row * 120 + (row === 0 ? 0 : 8 * row),
  };
};

export const animate = (
  order: number[],
  oldOrder?: number[],
  x?: number,
  y?: number,
  current?: number,
  active?: boolean
) => (index: number) => {
  if (current === index && active) {
    const z = getPosition(
      getPositionIndex((oldOrder || order).indexOf(current))
    );
    return {
      x: (x || 0) + z.x,
      y: (y || 0) + z.y,
      scale: 1.1,
      zIndex: 10,
      background: "white",
      immediate: (n: any) =>
        n === "y" || n === "zIndex" || n === "x" || n === "background",
    };
  }

  return {
    ...getPosition(getPositionIndex(order.indexOf(index))),
    zIndex: 1,
    scale: 1,
    background: "transparent",
  };
};
