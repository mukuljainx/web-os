import * as React from "react";
import { Redirect } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import IconInterface from "molecules/iconInterface";
import Desktop from "base/desktop";
import App from "apps";
import styled from "styled-components";
import useDraggable from "utils/hooks/useDraggable";
// import ContextMenu from "molecules/contextMenu";
import AppBar from "molecules/appBar";
import Menu from "molecules/startMenu";
import { toggleStartMenu as toggleStartMenuAction } from "base/store";
import { createFolder, initRoutes } from "apps/folder/store";
// import useFolderAction from "molecules/iconInterface/useFolderAction";
createFolder;

interface IProps {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Base = ({}: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  let user = useSelector((state) => state.auth.user);
  const openedApps = useSelector((state) => state.base.apps);
  const routes = useSelector((state) => state.folder.routes, shallowEqual);

  const { store, handleMouseDown } = useDraggable({ wrapperRef });
  const dispatch = useDispatch();
  const toggleStartMenu = React.useCallback(() => {
    dispatch(toggleStartMenuAction());
  }, [toggleStartMenuAction, dispatch]);

  if (!user) {
    return <Redirect to="/auth" />;
  }

  let desktopRoute = React.useMemo(
    () => routes.find((route) => route.file.data.id === "Desktop"),
    [routes]
  );

  // const { menuItems } = useFolderAction({
  //   route: desktopRoute?.path,
  //   user: user.name,
  // });

  React.useEffect(() => {
    window.os = {
      ...window.os,
      wrapper: wrapperRef.current!,
    };
    dispatch(initRoutes(user?.name || "Guest user"));
  }, []);

  return (
    <Desktop>
      <Wrapper ref={wrapperRef}>
        <Menu />
        {/* <ContextMenu wrapperRef={wrapperRef} items={menuItems} /> */}
        {Object.values(openedApps).map((app) => {
          return (
            <>
              {app.instances.map((instance, index) => {
                const dragId = instance.id;
                return (
                  <App
                    weight={app.weight + index}
                    onMouseDown={(event) => handleMouseDown(event, dragId)}
                    style={{
                      transform: store.elements[dragId]?.translate.x
                        ? `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`
                        : undefined,
                    }}
                    key={dragId}
                    app={instance}
                    data={instance.data}
                    id={instance.id}
                    metaData={instance.metaData!}
                  />
                );
              })}
            </>
          );
        })}
        <IconInterface
          route={desktopRoute?.path || ""}
          desktop
          user={user!.name}
          files={desktopRoute?.files || []}
        />
        <AppBar toggleMenu={toggleStartMenu} apps={openedApps} />
      </Wrapper>
    </Desktop>
  );
};

export default React.memo(Base);
