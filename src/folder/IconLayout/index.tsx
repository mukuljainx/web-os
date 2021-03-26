import * as React from "react";

import DraggableIcon from "./draggableIcon";
import { MoveHandler, ElementHandler } from "./interfaces";

interface IProps {}

const IconLayout = ({}: IProps) => {
  const dragging = React.useRef<
    Map<
      string,
      { move: MoveHandler; stop: Noop; unselect: Noop; start: MoveHandler }
    >
  >(new Map());

  const handleItemDragStart = React.useCallback<ElementHandler>(
    ({ multiple, id, coordinates, ...elementHandler }) => {
      const elementInState = dragging.current.get(id);

      if (!multiple) {
        // if the selection is without a hot key
        if (!elementInState) {
          // and element is new: forget previouse one and start with this one
          handleMouseDown();
          dragging.current.set(id, elementHandler);
        }
        // ignore the if already selected
      } else if (multiple) {
        // with hot key
        if (elementInState) {
          // then uncheck this one
          elementInState.stop();
          elementInState.unselect();
        } else {
          // take it in state
          dragging.current.set(id, elementHandler);
        }
      }

      if (dragging.current.size) {
        dragging.current.forEach(({ start }) => {
          start(coordinates);
        });
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }
    },
    []
  );

  const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
    dragging.current.forEach(({ move }) => {
      move({ x: clientX, y: clientY });
    });
  }, []);
  const handleMouseUp = React.useCallback(() => {
    dragging.current.forEach((elementHandle) => {
      elementHandle.stop();
    });
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseDown = React.useCallback(() => {
    dragging.current.forEach(({ unselect }) => {
      unselect();
    });
    dragging.current.clear();
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      // safeguard
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <div>
      <DraggableIcon key={1} id="1" onDragStart={handleItemDragStart} />
      <DraggableIcon key={2} id="2" onDragStart={handleItemDragStart} />
    </div>
  );
};

export default IconLayout;
