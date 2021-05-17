import * as React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import IconInterface from "molecules/iconInterface";
import Desktop from "base/desktop";
import App from "apps";
import styled from "styled-components";
import useDraggable from "utils/hooks/useDraggable";
import AppBar from "molecules/appBar";
import Menu from "molecules/startMenu";
import { toggleStartMenu as toggleStartMenuAction } from "base/store";
import { toggleQuickActions } from "apps/actionCenter/store";
import { initRoutes } from "apps/folder/store";
import ActionCenter from "apps/actionCenter";

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

  const dispatchToggleQuickActions = React.useCallback(() => {
    dispatch(toggleQuickActions());
  }, [toggleQuickActions, dispatch]);

  // if (!user) {
  //   return <Redirect to="/auth" />;
  // }

  let desktopRoute = React.useMemo(
    () => routes.find((route) => route.file.data.id === "Desktop"),
    [routes]
  );

  React.useEffect(() => {
    window.os = {
      ...window.os,
      wrapper: wrapperRef.current!,
    };
    dispatch(initRoutes(user?.name || "Guest user"));
  }, []);

  const handleMouseDownEvent = React.useCallback(
    (event: React.MouseEvent, dragId: string) => {
      handleMouseDown(event, dragId);
    },
    []
  );

  return (
    <Desktop>
      <Wrapper ref={wrapperRef}>
        <Menu />
        <ActionCenter />
        {Object.values(openedApps).map((app) => {
          return (
            <>
              {app.instances.map((instance, index) => {
                const dragId = instance.id;
                return (
                  <App
                    weight={app.weight + index}
                    onMouseDown={handleMouseDownEvent}
                    style={{
                      transform: store.elements[dragId]?.translate.x
                        ? `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`
                        : undefined,
                    }}
                    dragId={dragId}
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
        <AppBar
          toggleQuickActions={dispatchToggleQuickActions}
          toggleMenu={toggleStartMenu}
          apps={openedApps}
        />
      </Wrapper>
    </Desktop>
  );
};

export default React.memo(Base);
