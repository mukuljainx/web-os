import * as React from "react";

import useStore from "./store";
import { isInside } from "utils/dom";

interface IProps {
  wrapperRef: React.RefObject<HTMLElement>;
  onDragStart?: (event: React.MouseEvent) => void;
  onDragEnd?: (event: React.MouseEvent) => void;
  single?: boolean;
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

const useDraggable = ({
  wrapperRef,
  onDragStart,
  onDragEnd,
  single,
}: IProps) => {
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
      if (onDragStart) {
        onDragStart(event);
      }
      if (!single && (event.ctrlKey || event.metaKey)) {
        multiple = true;
      }

      const elementInState = dragging.current.has(id);

      if (!multiple) {
        // if the selection is without a hot key
        if (!elementInState) {
          // and element is new: forget previouse one and start with this one
          // TODO: is stop needed?
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

  const handleMouseMove = React.useCallback((event) => {
    if (
      wrapperRef.current &&
      !isInside(wrapperRef.current!, {
        left: event.clientX,
        top: event.clientY,
      })
    ) {
      if (onDragEnd) {
        onDragEnd(event);
      }
      stop();
      return;
    }
    actions.move(Array.from(dragging.current), {
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleMouseUp = React.useCallback((event) => {
    if (onDragEnd) {
      onDragEnd(event);
    }
    actions.stop(Array.from(dragging.current));
    removeEventListener(true);
  }, []);

  React.useEffect(() => removeEventListener, []);

  const removeEventListener = (mounted?: boolean) => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    if (!mounted || single) {
      window.removeEventListener("mousedown", handleWindowClick);
    }
  };
  const clearStore = React.useCallback(() => {
    actions.clear();
    dragging.current.clear();
  }, [actions.clear]);

  return { store, handleMouseDown, clearStore };
};

export default useDraggable;
