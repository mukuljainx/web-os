import * as React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

import { getOverflowAdjust, isInside } from "utils/dom";
import { IMetaData } from "base/interfaces";

const AnimatedWrapper = styled(animated.div)`
  z-index: 11;
  position: fixed;
`;

const TransitFolder = ({
  children,
  x,
  y,
  left,
  top,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  left: number;
  top: number;
}) => {
  const transition = useTransition(true, {
    from: {
      scale: 0.01,
      x: 0,
      y: 0,
    },
    enter: { scale: 1, x: 100 + x, y: 100 + y },
    leave: { opacity: 0.33 },
  });

  return transition((style) => (
    <AnimatedWrapper style={{ ...style, left, top }}>
      {children}
    </AnimatedWrapper>
  ));
};

const AnimatedFileWrapper = ({
  children,
  metaData,
}: {
  children: React.ReactNode;
  metaData: IMetaData;
}) => {
  const [state, setState] = React.useState({
    show: false,
    adjust: {
      left: 0,
      top: 0,
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

  const position = metaData.mousePosition!;

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
        {children}
      </div>
    );
  }

  return (
    <TransitFolder
      left={position.x}
      top={position.y}
      x={state.adjust.left}
      y={state.adjust.top}
    >
      <div style={{ position: "fixed" }} ref={ref}>
        {children}
      </div>
    </TransitFolder>
  );
};

export default AnimatedFileWrapper;
