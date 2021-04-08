import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  height: 100%;
`;

const Draggable = styled.div`
  position: fixed;
  z-index: 11;
  width: 600px;
  height: 400px;
  background: white;
`;

// import { IFile } from "base/interfaces";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Content from "./Content";
import { getRoutes } from "base/helper";

interface IProps {
  path: string;
}

const Folder = ({ path }: IProps) => {
  const [currentPath, setCurentPath] = React.useState("/");
  const routesMap = useSelector((state) => state.base.routes);
  const userName = useSelector((state) => state.auth.user!.name);

  const routes = React.useMemo(
    () =>
      getRoutes(routesMap[0], userName).sort((a, b) =>
        a.path.length < b.path.length ? 1 : -1
      ),
    [routesMap]
  );

  const currentRoute = routes.find((r) => r.path === currentPath);

  const fileAction = React.useCallback((path: string) => {
    setCurentPath(path);
  }, []);

  console.log(path);

  if (!currentRoute) {
    throw Error("No matching route");
  }

  return (
    <Draggable>
      <Wrapper className="flex">
        <SideBar></SideBar>
        <Wrapper className="flex flex-column flex-grow">
          <TopBar></TopBar>
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
