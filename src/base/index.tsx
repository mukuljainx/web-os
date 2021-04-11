import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import IconInterface from "molecules/iconInterface";
import { getRoutes } from "base/helper";
import Desktop from "base/desktop";
import App from "apps";
import styled from "styled-components";
import useDraggable from "utils/hooks/useDraggable";

interface IProps {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Base = ({}: IProps) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  let user = useSelector((state) => state.auth.user);
  const routesMap = useSelector((state) => state.base.routes);
  const openedApps = useSelector((state) => state.base.apps);
  const { store, handleMouseDown } = useDraggable({ wrapperRef });

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const routes = React.useMemo(
    () =>
      getRoutes(routesMap[0], user!.name).sort((a, b) =>
        a.path.length < b.path.length ? 1 : -1
      ),
    [routesMap]
  );

  const desktopRoutes = React.useMemo(
    () => routes.find((route) => route.file.id === "desktop"),
    [routesMap]
  );

  React.useEffect(() => {
    window.os = {
      ...window.os,
      wrapper: wrapperRef.current!,
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      {Object.values(openedApps).map((app) => {
        return (
          <>
            {app.instances.map((instance, index) => {
              const dragId = `${app.id}-${instance.id}-${index}`;
              return (
                <App
                  onMouseDown={(event) => handleMouseDown(event, dragId)}
                  style={{
                    transform: store.elements[dragId]?.translate.x
                      ? `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`
                      : undefined,
                  }}
                  key={dragId}
                  name={app.name}
                  data={instance.data}
                  appId={app.id}
                  id={instance.id}
                  metaData={instance.metaData!}
                />
              );
            })}
          </>
        );
      })}
      <Desktop>
        <IconInterface user={user!.name} files={desktopRoutes!.files} />
      </Desktop>
    </Wrapper>
  );
};

export default React.memo(Base);
