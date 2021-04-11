import styled from "styled-components";
import * as React from "react";

// import { MoveHandler, ElementHandler } from "./interfaces";
import { IFile } from "base/interfaces";
import { interpolate } from "utils/string";
import { getPath } from "base/helper";
// import { isInside } from "utils/dom";
import useDraggable from "utils/hooks/useDraggable";
import Icon from "atoms/icons";

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
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { store, handleMouseDown } = useDraggable({ wrapperRef });

  return (
    <Wrapper data-id="icon-interface" ref={wrapperRef}>
      {files.map((file, index) => {
        const fileName = interpolate(file.name, { user });
        const path = getPath(file, user);
        const dragId = file.id + index;
        return (
          <Icon
            type="DESKTOP"
            onMouseDown={(event) => {
              handleMouseDown(event, dragId);
            }}
            style={{
              transform: `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`,
            }}
            highlight={store.elements[dragId]?.selected}
            onDoubleClick={(event) => {
              if (fileAction) {
                fileAction(path);
              } else {
                window.os.openApp({
                  id: "folder",
                  name: "folder",
                  sleepTimeout: 1000,
                  data: { path },
                  metaData: {
                    mousePosition: {
                      x: event.clientX,
                      y: event.clientY,
                    },
                  },
                });
              }
            }}
            name={file.icon}
            label={fileName}
            key={dragId}
            id={file.id}
          />
        );
      })}
    </Wrapper>
  );
};

export default IconLayout;
