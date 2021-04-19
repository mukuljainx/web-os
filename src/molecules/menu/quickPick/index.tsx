import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useSprings, animated } from "react-spring";
//@ts-ignore
import swap from "lodash-move";

import { Stack, Text } from "atoms/styled";
import AppBlock from "./appBlock";
// TODO: app list from store
import { fakeList } from "../appList";
import useDraggable from "utils/hooks/useDraggable";
import { animate } from "./utils";

const UserInfo = styled.div`
  margin-bottom: 32px;
  text-align: center;
  flex-shrink: 0;
`;

const AppWrapper = styled(Stack)`
  flex-grow: 2;
  overflow: auto;
  flex-wrap: wrap;
  position: relative;
`;

const AnimatedWrapper = styled(animated.div)`
  position: absolute;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 4px;

  &:nth-child(3n) {
    margin-right: 0px;
  }
`;

interface IProps {}

let appsZ: Array<{ name: string; icon: string }> = [];
const fakeApps = fakeList();
fakeApps.forEach((a) => {
  appsZ = [...appsZ, ...a.apps];
});

const QucikPick = ({}: IProps) => {
  const apps = appsZ;
  const order = React.useRef(apps.map((_, index) => index));
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.auth.user?.name);
  const startPosition = React.useRef({ x: 0, y: 0 });
  const draggingIndex = React.useRef(-1);

  const onDragStart = React.useCallback((event: React.MouseEvent) => {
    startPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const { store, handleMouseDown, clearStore } = useDraggable({
    wrapperRef,
    single: true,
    onDragStart,
  });

  React.useEffect(() => {
    if (!store.id) {
      return;
    }
    const gap = {
      x: store.elements[store.id!].translate.x,
      y: store.elements[store.id!].translate.y,
    };
    // down-up : 3
    let y = Math.round(gap.y / 120);
    if (Math.abs(y) > 0.5) {
      y = y * 3;
    }
    const x = Math.round(gap.x / 120);
    const z = y + x + order.current.indexOf(draggingIndex.current);

    let newIndex = Math.round(z);

    const newOrder = [...order.current];
    if (newIndex < 0) {
      newIndex = order.current.indexOf(draggingIndex.current);
    } else {
      newOrder.splice(newOrder.indexOf(draggingIndex.current), 1);
      newOrder.splice(newIndex, 0, draggingIndex.current);
    }

    setSprings(
      animate(
        newOrder,
        order.current,
        gap.x,
        gap.y,
        draggingIndex.current,
        store.active
      )
    );
    if (!store.active) {
      clearStore();
      order.current = newOrder;
    }
  }, [store]);

  const [springs, setSprings] = useSprings(apps.length, animate(order.current));

  return (
    <Stack fullHeight flexDirection="column" paddingX={16}>
      <UserInfo>
        <Text variant="medium" weight="bold">
          {user}
        </Text>
      </UserInfo>
      <AppWrapper ref={wrapperRef}>
        {springs.map((props, i) => {
          const dragId = apps[i].name;
          return (
            <AnimatedWrapper key={apps[i].name} style={props}>
              <AppBlock
                onMouseDown={(event) => {
                  draggingIndex.current = i;
                  handleMouseDown(event, dragId);
                }}
                style={{
                  width: 120,
                  height: 120,
                  // transform: store.elements[dragId]
                  //   ? `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`
                  //   : ``,
                }}
                name={apps[i].name}
                icon={apps[i].name}
              />
            </AnimatedWrapper>
          );
        })}
      </AppWrapper>
    </Stack>
  );
};

export default QucikPick;
