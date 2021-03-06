import * as React from "react";
import styled from "styled-components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import SideBar from "./SideBar";
import TopBar from "./topbar";
import Content from "./Content";
import useHistory from "utils/hooks/useHistory";
import { IApp, IMetaData } from "base/interfaces";
import { Acrylic } from "atoms/styled";
import NavigationBar from "./navigationBar";
import { bringToTop } from "base/store";
import { IFile } from "./interfaces";
import { dispatchEvent } from "utils/events";
import useDidUpdate from "utils/hooks/useDidUpdate";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const Container = styled(Acrylic)`
  &:focus {
    outline: none;
  }
  z-index: 11;
  width: 720px;
  min-width: 240px;
  min-height: 240px;
  height: 480px;
  overflow: auto;
  resize: both;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

interface IProps {
  path: string;
  app: IApp;
  id: string;
  metaData: IMetaData;
  dragId: string;
  onMouseDown: (event: React.MouseEvent, dragId: string) => void;
}

const getPathName = (path: string) => {
  return path.split("/").pop() || "/";
};

const Folder = ({ path, app, id, dragId, onMouseDown }: IProps) => {
  const { firstRender } = useDidUpdate();
  const dispatchFolderLoadEvent = React.useCallback(() => {
    // dispatch a fake animation complete event so dependent can do their work on route change
    dispatchEvent("ANIMATED_FOLDER_ANIMATION_COMPLETED", {
      appName: app.appName,
      id,
    });
  }, [app, id]);
  const { getCurrent, push, navigate, state: history } = useHistory(path);
  const isMetaKey = React.useRef(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const routes = useSelector((state) => state.folder.routes, shallowEqual);

  const userName = useSelector((state) => state.auth.user!.name, shallowEqual);
  const currentRoute = routes.find((r) => r.path === getCurrent());
  const folderToRoute = useSelector((state) => state.folder.folderToRoute);

  const fileAction = React.useCallback(
    (event: React.MouseEvent, file: IFile) => {
      event;
      if (file.appName === "folder") {
        push(folderToRoute[file.data.id]);
      } else {
        // window.os.openApp({
        //   appName: file.appName,
        //   id: file.id,
        //   icon: file.icon,
        //   name: file.name,
        //   sleepTimeout: 1000,
        //   data: { path },
        //   metaData: {
        //     mousePosition: {
        //       x: event.clientX,
        //       y: event.clientY,
        //     },
        //   },
        // });
      }
    },
    [push, folderToRoute]
  );

  React.useEffect(() => {
    // to focus on path change so keyboard shortcut will work
    wrapperRef.current?.focus();
    if (!firstRender) {
      dispatchFolderLoadEvent();
    }
  }, [getCurrent()]);

  const previousRoute = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const nextRoute = React.useCallback(() => {
    navigate(1);
  }, [navigate]);

  const handleClose = React.useCallback(() => {
    window.os.closeApp({ appName: app.appName, instanceId: id });
  }, []);

  const goToParentRoute = React.useCallback(() => {
    const currentRoute = getCurrent();
    if (currentRoute === "/") return;
    const newRoute = getCurrent().split("/");
    newRoute.pop();
    push(newRoute.join("/") || "/");
  }, [currentRoute, push]);

  if (!currentRoute) {
    throw Error("No matching route for: " + getCurrent());
  }

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isMetaKey.current) {
        switch (event.code) {
          case "KeyW": {
            handleClose();
            return;
          }
          case "ArrowUp": {
            goToParentRoute();
            return;
          }
        }
      }

      if (event.code === "MetaLeft" || event.code === "MetaRight") {
        isMetaKey.current = true;
      }
    },
    [navigate, push, getCurrent]
  );

  const handleKeyUp = React.useCallback((event: React.KeyboardEvent) => {
    event.preventDefault();
    if (event.code === "MetaLeft" || event.code === "MetaRight") {
      isMetaKey.current = false;
    }
  }, []);

  const handleTopBarMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      onMouseDown(event, dragId);
      dispatch(bringToTop({ appName: app.appName, instanceId: app.id }));
    },
    [onMouseDown]
  );

  const dispatch = useDispatch();

  return (
    <Container
      onMouseDown={() => {
        dispatch(bringToTop({ appName: app.appName, instanceId: app.id }));
      }}
      ref={wrapperRef}
      tabIndex={0}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
    >
      <Wrapper className="flex">
        <SideBar
          user={userName}
          app={app}
          onMouseDown={handleTopBarMouseDown}
          push={push}
        />
        <Wrapper className="flex flex-column flex-grow">
          <TopBar
            name={getPathName(getCurrent())}
            onMouseDown={handleTopBarMouseDown}
            onCloseClick={handleClose}
          ></TopBar>
          <NavigationBar
            history={history}
            app={app}
            onNextClick={nextRoute}
            onPreviousClick={previousRoute}
            onUpwardClick={goToParentRoute}
            push={push}
          />
          <Content
            route={currentRoute.path}
            app={app}
            fileAction={fileAction}
            user={userName}
            files={currentRoute.files!}
          ></Content>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};
export default React.memo(Folder);
