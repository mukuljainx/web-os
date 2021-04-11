import * as React from "react";

import useStore from "./store";
import { isInside } from "utils/dom";

interface IProps {
  wrapperRef: React.RefObject<HTMLElement>;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: () => void;
}

/**
 *
 * Icon interactions, taken from Mac OS
 *
 * Case 1
 * User clicks the icon and drags it
 * focus: true
 * `focus` will remain `true` until user
 * clicks on another icon or anywhere
 *
 * Case 2
 * User selects multiple Icons using cmd or ctrl
 * and drags them
 * focus: true
 * `focus` behavoir same as case 1
 *
 */

const useDraggable = ({ wrapperRef }: IProps) => {
  const [store, actions] = useStore();

  const dragging = React.useRef<Set<string>>(new Set());

  const handleWindowClick = React.useCallback(() => {
    actions.stop(Array.from(dragging.current));
    actions.unselect(Array.from(dragging.current));
    dragging.current.clear();
  }, []);

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent, id: string) => {
      const coordinates = { x: event.clientX, y: event.clientY };
      event.stopPropagation();
      let multiple = false;

      if (event.ctrlKey || event.metaKey) {
        multiple = true;
      }

      const elementInState = dragging.current.has(id);

      if (!multiple) {
        // if the selection is without a hot key
        if (!elementInState) {
          // and element is new: forget previouse one and start with this one
          stop();
          dragging.current.add(id);
        }
        // ignore the if already selected
      } else if (multiple) {
        // with hot key
        if (elementInState) {
          // then uncheck this one
          actions.stop(id);
          actions.unselect(id);
        } else {
          // take it in state
          dragging.current.add(id);
        }
      }

      if (dragging.current.size) {
        dragging.current.forEach((id) => {
          actions.start(id, coordinates);
        });
        window.addEventListener("mousedown", handleWindowClick);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }
    },
    []
  );

  const stop = React.useCallback(() => {
    actions.stop(Array.from(dragging.current));
    actions.unselect(Array.from(dragging.current));

    dragging.current.clear();
  }, []);

  const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
    if (
      wrapperRef.current &&
      !isInside(wrapperRef.current!, { left: clientX, top: clientY })
    ) {
      stop();
      return;
    }
    actions.move(Array.from(dragging.current), { x: clientX, y: clientY });
  }, []);

  const handleMouseUp = React.useCallback(() => {
    actions.stop(Array.from(dragging.current));
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  React.useEffect(() => {
    return () => window.removeEventListener("mousedown", handleWindowClick);
  }, []);

  return { store, handleMouseDown };
};

export default useDraggable;
