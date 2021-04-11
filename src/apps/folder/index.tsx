import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Content from "./Content";
import { getRoutes } from "base/helper";
import { useHistory } from "utils/hooks/useHistroy";
import { interpolate } from "utils/string";
import { IMetaData } from "base/interfaces";

const Wrapper = styled.div`
  height: 100%;
`;

const Draggable = styled.div`
  z-index: 11;
  width: 720px;
  height: 480px;
  background: white;
`;

interface IProps {
  path: string;
  appId: string;
  id: string;
  metaData: IMetaData;
  onMouseDown: (event: React.MouseEvent) => void;
}

const Folder = ({ path, appId, id, onMouseDown }: IProps) => {
  const { getCurrent, push, navigate } = useHistory("/");
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
      console.log({ path });
      push(interpolate(path, { user: userName }));
    },
    [push]
  );
  path;

  const previousRoute = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const nextRoute = React.useCallback(() => {
    navigate(1);
  }, [navigate]);

  const handleClose = React.useCallback(() => {
    window.os.closeApp({ appId, instanceId: id });
  }, []);

  if (!currentRoute) {
    throw Error("No matching route");
  }

  return (
    <Draggable>
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
    </Draggable>
  );
};
export default Folder;
