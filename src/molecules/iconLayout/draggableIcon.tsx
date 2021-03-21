import * as React from "react";

import useStore from "./store";
import Icon from "atoms/icons";
import { MoveHandler } from ".";

interface IProps {
  onDragStart: (params: { move: MoveHandler; stop: Noop }) => void;
}

const DraggableIcon = ({ onDragStart }: IProps) => {
  const store = useStore();
  const element = React.useRef(null);

  const handleMouseDown = React.useCallback(({ clientX, clientY }) => {
    const icon = element.current! as HTMLDivElement;
    if (icon) {
      store.start({
        x: clientX,
        y: clientY,
      });
    }

    onDragStart({ move: store.move, stop: store.stop });
  }, []);

  return (
    <Icon
      style={{
        transform: `translate(${store.state.translate.x}px, ${store.state.translate.y}px)`,
      }}
      innnerRef={element}
      className="p-absolute"
      onMouseDown={handleMouseDown}
      name="folder"
      type="DESKTOP"
      label="Applications"
    />
  );
};

export default DraggableIcon;
