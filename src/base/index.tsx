import * as React from "react";
import { Redirect } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import IconInterface from "molecules/iconInterface";
import Desktop from "base/desktop";
import App from "apps";
import styled from "styled-components";
import useDraggable from "utils/hooks/useDraggable";
import ContextMenu from "molecules/contextMenu";
import AppBar from "molecules/appBar";
import Menu from "molecules/startMenu";
import { toggleStartMenu as toggleStartMenuAction } from "base/store";
import { initRoutes } from "apps/folder/store";

interface IProps {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Base = ({}: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  let user = useSelector((state) => state.auth.user);

  const openedApps = useSelector((state) => state.base.apps);
  const { store, handleMouseDown } = useDraggable({ wrapperRef });
  const dispatch = useDispatch();
  const toggleStartMenu = React.useCallback(() => {
    dispatch(toggleStartMenuAction());
  }, [toggleStartMenuAction, dispatch]);

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const routes = useSelector((state) => state.folder.routes, shallowEqual);

  const desktopRoutes = React.useMemo(
    () => routes.find((route) => route.file.id === "desktop"),
    [routes]
  );

  React.useEffect(() => {
    window.os = {
      ...window.os,
      wrapper: wrapperRef.current!,
    };
    dispatch(initRoutes(user?.name || "Guest user"));
  }, []);

  const MenuItemAction = React.useCallback((label: string, id: string) => {
    console.log(label, id);
  }, []);

  const menuItems = [
    {
      label: "New Folder",
      action: MenuItemAction,
      id: "new-folder",
      icon: "ViewAll",
      children: [
        { label: "Option A", action: MenuItemAction, id: "get-info" },
        { label: "Option B", action: MenuItemAction, id: "get-info" },
      ],
    },
    { label: "Get Info", action: MenuItemAction, id: "get-info" },
    {
      label: "Change Desktop Background",
      action: MenuItemAction,
      id: "change-desktop-background",
      disabled: true,
    },
  ];

  return (
    <Desktop>
      <Wrapper ref={wrapperRef}>
        <Menu />
        <ContextMenu wrapperRef={wrapperRef} items={[menuItems, menuItems]} />
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
        <IconInterface user={user!.name} files={desktopRoutes?.files || []} />
        <AppBar toggleMenu={toggleStartMenu} apps={openedApps} />
      </Wrapper>
    </Desktop>
  );
};

export default React.memo(Base);
