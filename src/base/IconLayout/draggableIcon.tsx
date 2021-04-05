import * as React from "react";

import useStore from "./store";
import Icon from "atoms/icons";
import { ElementHandler } from "./interfaces";

interface IProps {
  onDragStart: ElementHandler;
  id: string;
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

const DraggableIcon = ({ onDragStart, id }: IProps) => {
  const store = useStore(id);
  const element = React.useRef(null);

  const handleMouseDown = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    let multiple = false;
    if (event.ctrlKey || event.metaKey) {
      multiple = true;
    }

    // store.start({
    //   x: event.clientX,
    //   y: event.clientY,
    // });

    onDragStart({
      // for singal element we can start from here
      // but for other start should be reset using the
      // last element picked
      coordinates: {
        x: event.clientX,
        y: event.clientY,
      },
      start: store.start,
      move: store.move,
      stop: store.stop,
      unselect: store.unselect,
      multiple,
      id,
    });
  }, []);

  return (
    <Icon
      style={{
        transform: `translate(${store.state.translate.x}px, ${store.state.translate.y}px)`,
      }}
      innnerRef={element}
      className={`${store.state.selected ? "icon--focus" : ""}`}
      onMouseDown={handleMouseDown}
      name="folder"
      type="DESKTOP"
      label={`Applications ${id}`}
    />
  );
};

export default DraggableIcon;
