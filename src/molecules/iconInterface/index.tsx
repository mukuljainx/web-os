import styled from "styled-components";
import * as React from "react";

// import { IFile } from "apps/folder/interfaces";
import { interpolate } from "utils/string";
// import { getPath } from "apps/folder/helper";
import useDraggable from "utils/hooks/useDraggable";
import AppIcon from "atoms/appIcon";
import useFolderAction from "./useFolderAction";
import ContextMenu from "molecules/contextMenu";
import { IFile } from "apps/folder/interfaces";
import { shallowEqual, useSelector } from "react-redux";

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

interface IProps {
  files: IFile[];
  user: string;
  fileAction?: (event: React.MouseEvent, file: IFile) => void;
  desktop?: boolean;
  route: string;
}

const IconLayout = ({ desktop, files, user, fileAction, route }: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { store, handleMouseDown, clearStore } = useDraggable({ wrapperRef });
  const folderPool = useSelector(
    (state) => state.folder.folderPool,
    shallowEqual
  );
  const folderToRoute = useSelector(
    (state) => state.folder.folderToRoute,
    shallowEqual
  );

  const { menuItems } = useFolderAction({
    route,
    user,
    clearStore,
  });

  return (
    <>
      <ContextMenu wrapperRef={wrapperRef} items={menuItems} />
      <Wrapper data-id="icon-interface" ref={wrapperRef}>
        {files.map((file: IFile, index) => {
          const fileDetail = folderPool[file.data.id];
          const fileName = interpolate(fileDetail.name, { user });
          const path = folderToRoute[file.data.id];
          const dragId = fileDetail.id + index;
          return (
            <AppIcon
              name={fileName}
              path={path}
              icon={fileDetail.icon}
              desktop={desktop}
              safe={fileDetail.safe}
              tabIndex={0}
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
                  fileAction(event, file);
                } else {
                  window.os.openApp({
                    appName: file.appName,
                    id: fileDetail.id,
                    icon: fileDetail.icon,
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
              key={dragId}
              fileId={file.data.id}
            />
          );
        })}
      </Wrapper>
    </>
  );
};

export default IconLayout;
