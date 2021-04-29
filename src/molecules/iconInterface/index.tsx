import styled from "styled-components";
import * as React from "react";

import { IFile } from "apps/folder/interfaces";
import { interpolate } from "utils/string";
import { getPath } from "apps/folder/helper";
import useDraggable from "utils/hooks/useDraggable";
import Icon from "atoms/icons";
import useFolderAction from "./useFolderAction";
import ContextMenu from "molecules/contextMenu";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction?: (path: string) => void;
  desktop?: boolean;
  route: string;
}

const IconLayout = ({ desktop, files, user, fileAction, route }: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { store, handleMouseDown, clearStore } = useDraggable({ wrapperRef });

  const { menuItems } = useFolderAction({
    route,
    user,
    clearStore,
  });

  return (
    <>
      <ContextMenu wrapperRef={wrapperRef} items={menuItems} />
      <Wrapper data-id="icon-interface" ref={wrapperRef}>
        {files.map((file, index) => {
          const fileName = interpolate(file.name, { user });
          const path = getPath(file, user);
          const dragId = file.id + index;
          return (
            <Icon
              desktop={desktop}
              safe={file.safe}
              tabIndex={0}
              path={path}
              onMouseDown={(event) => {
                handleMouseDown(event, dragId);
              }}
              style={{
                transform: `translate(${
                  store.elements[dragId]?.translate.x || 0
                }px, ${store.elements[dragId]?.translate.y || 0}px)`,
              }}
              highlight={store.elements[dragId]?.selected}
              onDoubleClick={(event) => {
                if (fileAction) {
                  fileAction(path);
                } else {
                  window.os.openApp({
                    appName: file.appName,
                    id: file.id,
                    icon: file.icon,
                    name: fileName,
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
    </>
  );
};

export default IconLayout;
