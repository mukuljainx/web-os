import styled from "styled-components";
import * as React from "react";

import DraggableIcon from "./DraggableIcon";
import { MoveHandler, ElementHandler } from "./interfaces";
import { IFile } from "base/interfaces";
import { interpolate } from "utils/string";
import { getPath } from "base/helper";
import { isInside } from "utils/dom";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction?: (path: string) => void;
}

const IconLayout = ({ files, user, fileAction }: IProps) => {
  const dragging = React.useRef<
    Map<
      string,
      { move: MoveHandler; stop: Noop; unselect: Noop; start: MoveHandler }
    >
  >(new Map());

  const wrapperRef = React.useRef<HTMLDivElement>(null);

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
    if (!isInside(wrapperRef, { x: clientX, y: clientY })) {
      handleMouseDown();
      return;
    }
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
    dragging.current.forEach(({ unselect, stop }) => {
      unselect();
      stop();
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
  }, []);

  React.useEffect(() => {
    // on each files change this component remains mounted
    // but sometimes it may keep a ref to a fucntion in dragging ref
    dragging.current.clear();
  }, [files]);

  return (
    <Wrapper data-id="icon-interface" ref={wrapperRef}>
      {files.map((file) => {
        const fileName = interpolate(file.name, { user });
        const path = getPath(file, user);
        return (
          <DraggableIcon
            onDoubleClick={() => {
              if (fileAction) {
                fileAction(path);
              } else {
                window.os.openApp({
                  id: "folder",
                  name: "folder",
                  sleepTimeout: 1000,
                  data: { path },
                });
              }
            }}
            icon={{ name: file.icon, label: fileName, path }}
            key={file.id}
            id={file.id}
            onDragStart={handleItemDragStart}
          />
        );
      })}
    </Wrapper>
  );
};

export default IconLayout;
