import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTransition, animated, useSpring } from "react-spring";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Content from "./Content";
import { getRoutes } from "base/helper";
import { useHistory } from "utils/hooks/useHistroy";
import { interpolate } from "utils/string";
import { IMetaData } from "base/interfaces";
import { getOverflowAdjust, isInside } from "utils/dom";

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
}

const Folder = ({ path, appId, id }: IProps) => {
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

const AnimatedWrapper = styled(animated.div)`
  z-index: 11;
  position: fixed;
`;

const AnimatedFolder = (props: IProps) => {
  const [state, setState] = React.useState({
    show: false,
    adjust: {
      left: 0,
      top: 0,
    },
  });

  const spring = useSpring({
    from: {
      scale: 0.01,
      x: 0,
      y: 0,
    },
    to: {
      scale: 1,
      x: 100 + state.adjust.left,
      y: 100 + state.adjust.top,
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current!;
    const { left, top, right, bottom } = element.getBoundingClientRect();
    const coordinates = {
      left: left + 100,
      right: right + 100,
      top: top + 100,
      bottom: bottom + 100,
    };
    const elementOverflowing = !isInside(window.os.wrapper, coordinates);

    let adjust = { left: 0, top: 0 };
    if (elementOverflowing) {
      adjust = getOverflowAdjust(window.os.wrapper, coordinates);
    }

    setState((prevState) => ({
      ...prevState,
      show: true,
      adjust,
    }));
  }, []);

  console.log(state);

  const position = props.metaData.mousePosition!;

  useTransition;

  // const transition = useTransition(true, {
  //   from: {
  //     scale: 0.01,
  //     x: 0,
  //     y: 0,
  //   },
  //   enter: { scale: 1, x: 100 + state.adjust.left, y: 100 + state.adjust.top },
  //   leave: { opacity: 0.33 },
  // });

  // React.useEffect(() => {
  //   if(show){
  //     spring.x.start()
  //   }
  // }, [state.show])

  if (!state.show) {
    return (
      <div
        style={{
          position: "fixed",
          opacity: 0,
          left: position.x,
          top: position.y,
        }}
        ref={ref}
      >
        <Folder {...props} />
      </div>
    );
  }

  // return transition((style) => (
  return (
    <>
      {true && (
        <AnimatedWrapper
          style={{
            ...spring,
            left: position.x,
            top: position.y,
          }}
        >
          <div style={{ position: "fixed" }} ref={ref}>
            <Folder {...props} />
          </div>
        </AnimatedWrapper>
      )}
    </>
  );
  // ));
};

export default AnimatedFolder;
