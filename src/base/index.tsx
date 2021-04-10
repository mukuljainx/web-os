import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import IconInterface from "molecules/iconInterface";
import { getRoutes } from "base/helper";
import Desktop from "base/desktop";
import App from "apps";
import styled from "styled-components";

interface IProps {}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Base = ({}: IProps) => {
  let user = useSelector((state) => state.auth.user);
  const routesMap = useSelector((state) => state.base.routes);
  const openedApps = useSelector((state) => state.base.apps);

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

  const wrapperRef = React.useRef<HTMLDivElement>(null);

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
            {app.instances.map((instance) => (
              <App
                key={instance.id}
                name={app.name}
                data={instance.data}
                appId={app.id}
                id={instance.id}
                metaData={instance.metaData!}
              />
            ))}
          </>
        );
      })}
      <Desktop>
        <IconInterface user={user!.name} files={desktopRoutes!.files} />
      </Desktop>
    </Wrapper>
    // <BrowserRouter>
    //   <Switch>

    //     {routes.map((route) => (
    //       <Route
    //         key={route.path}
    //         path={route.path}
    //         render={(props) => {
    //           if (route.file.id === "desktop") {
    //             return (
    //               <Desktop>
    //                 <Folder {...props} user={user!.name} files={route.files} />
    //               </Desktop>
    //             );
    //           }

    //           return (
    //             <Folder {...props} user={user!.name} files={route.files} />
    //           );
    //         }}
    //       />
    //     ))}
    //     <Route
    //       path="/"
    //       exact
    //       render={(props) => (
    //         <Folder {...props} user={user!.name} files={state.root.files!} />
    //       )}
    //     ></Route>
    //   </Switch>
    //  </BrowserRouter>
  );
};

export default React.memo(Base);
