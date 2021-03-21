import * as React from "react";

import DraggableIcon from "./draggableIcon";

export type MoveHandler = (param: { x: number; y: number }) => void;

interface IProps {}

const IconLayout = ({}: IProps) => {
  const dragging = React.useRef<{ move: MoveHandler; stop: Noop }[]>([]);

  const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
    dragging.current.forEach((elementHandle) => {
      elementHandle.move({ x: clientX, y: clientY });
    });
  }, []);
  const handleMouseUp = React.useCallback(() => {
    dragging.current.forEach((elementHandle) => {
      elementHandle.stop();
    });
    dragging.current = [];
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleItemDragStart = React.useCallback(
    (elementHandler: { move: MoveHandler; stop: Noop }) => {
      dragging.current.push(elementHandler);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    []
  );

  return (
    <div>
      <DraggableIcon onDragStart={handleItemDragStart} />
    </div>
  );
};

export default IconLayout;
