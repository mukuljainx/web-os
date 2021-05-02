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
  instanceId?: string;
}

const IconLayout = ({
  desktop,
  files,
  user,
  fileAction,
  route,
  instanceId,
}: IProps) => {
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
          let fileDetail = { name: "", icon: "", id: "", path: "", safe: true };
          let data: IData = {};
          const path = folderToRoute[file.data.id];
          const dragId = fileDetail.id + index;

          if (file.appName === "folder") {
            const details = folderPool[file.data.id];
            fileDetail = {
              name: interpolate(details.name, { user }),
              icon: details.icon,
              id: file.data.id,
              path: folderToRoute[file.data.id],
              safe: !!details.safe,
            };
            data = { path };
          } else {
            fileDetail = {
              name: file.data.name,
              icon: file.data.icon,
              id: file.data.id,
              path: folderToRoute[file.data.id],
              safe: false,
            };
            data = { ...file.data };
          }

          return (
            <AppIcon
              instanceId={instanceId}
              data={file.data}
              symlink={!!file.symlink}
              name={fileDetail.name}
              path={path}
              icon={fileDetail.icon}
              desktop={desktop}
              safe={fileDetail.safe}
              tabIndex={0}
              appName={file.appName}
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
                if (fileAction && file.appName === "folder") {
                  fileAction(event, file);
                } else {
                  window.os.openApp({
                    appName: file.appName,
                    id: fileDetail.id,
                    icon: fileDetail.icon,
                    name: fileDetail.name,
                    sleepTimeout: 1000,
                    data: data,
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

export default React.memo(IconLayout);
