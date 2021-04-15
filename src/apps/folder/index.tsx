import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Content from "./Content";
import { getRoutes } from "base/helper";
import useHistory from "utils/hooks/useHistory";
import { interpolate } from "utils/string";
import { IMetaData } from "base/interfaces";

const Wrapper = styled.div`
  height: 100%;
`;

const Container = styled.div`
  &:focus {
    outline: none;
  }
  z-index: 11;
  width: 720px;
  height: 480px;
  overflow: auto;
  resize: both;
  background: white;
`;

interface IProps {
  path: string;
  appName: string;
  id: string;
  metaData: IMetaData;
  onMouseDown: (event: React.MouseEvent) => void;
}

const Folder = ({ path, appName, id, onMouseDown }: IProps) => {
  const { getCurrent, push, navigate } = useHistory(path);
  const isMetaKey = React.useRef(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const routesMap = useSelector((state) => state.base.routes);
  const userName = useSelector((state) => state.auth.user!.name);

  const routes = React.useMemo(
    () =>
      getRoutes(routesMap[0], userName).sort((a, b) =>
        a.path.length < b.path.length ? 1 : -1
      ),
    [routesMap]
  );

  const currentRoute = routes.find((r) => r.path === getCurrent());

  const fileAction = React.useCallback(
    (path: string) => {
      push(interpolate(path, { user: userName }));
    },
    [push]
  );

  React.useEffect(() => {
    // to focus on path change so keyboard shortcut will work
    wrapperRef.current?.focus();
  }, [getCurrent()]);

  const previousRoute = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const nextRoute = React.useCallback(() => {
    navigate(1);
  }, [navigate]);

  const handleClose = React.useCallback(() => {
    window.os.closeApp({ appName, instanceId: id });
  }, []);

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
            const currentRoute = getCurrent();
            if (currentRoute === "/") return;
            const newRoute = getCurrent().split("/");
            newRoute.pop();
            push(newRoute.join("/") || "/");
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

  return (
    <Container
      ref={wrapperRef}
      tabIndex={0}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
    >
      <Wrapper className="flex">
        <SideBar></SideBar>
        <Wrapper className="flex flex-column flex-grow">
          <TopBar
            onMouseDown={onMouseDown}
            onNextClick={nextRoute}
            onPreviousClick={previousRoute}
            onCloseClick={handleClose}
          ></TopBar>
          <Content
            fileAction={fileAction}
            user={userName}
            files={currentRoute.files}
          ></Content>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};
export default Folder;
