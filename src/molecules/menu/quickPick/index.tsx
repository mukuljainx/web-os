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
  // const [apps, setApps] = React.useState(appsZ);
  const apps = appsZ;
  const fakeStart = React.useRef({ x: 0, y: 0 });
  const [current, setCurrent] = React.useState(-1);
  const order = React.useRef(apps.map((_, index) => index));
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.auth.user?.name);
  const startPosition = React.useRef({ x: 0, y: 0 });
  const initialElementTransform = React.useRef({ x: 0, y: 0 });
  const draggingIndex = React.useRef(-1);

  // const onDragStart = React.useCallback((event: React.MouseEvent) => {
  //   startPosition.current = {
  //     x: event.clientX,
  //     y: event.clientY,
  //   };
  // }, []);

  // const onDragEnd = React.useCallback((event: React.MouseEvent) => {
  //   const gap = {
  //     x: event.clientX - startPosition.current.x - 8,
  //     y: event.clientY - startPosition.current.y - 8,
  //   };
  //   // down-up : 3
  //   let y = Math.round(gap.y / 120);
  //   if (Math.abs(y) > 0.5) {
  //     y = y * 3;
  //   }
  //   const x = Math.round(gap.x / 120);
  //   const z = y + x + draggingIndex.current;

  //   console.log(gap, z);

  //   if (z < 0 || z > apps.length) {
  //     clearStore();
  //     return;
  //   }

  //   setApps((items) => {
  //     const index = Math.round(z);
  //     const newItems = items.filter((__, j) => j !== draggingIndex.current);
  //     newItems.splice(index, 0, items[draggingIndex.current]);
  //     return [...newItems];
  //   });
  // }, []);

  const { store, handleMouseDown, clearStore } = useDraggable({
    wrapperRef,
    single: true,
    // onDragStart,
    // onDragEnd,
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

  const func = React.useCallback((event: MouseEvent) => {
    const element = document.querySelector("#fake-div") as HTMLDivElement;
    const gap = {
      x: event.clientX - startPosition.current.x - 8,
      y: event.clientY - startPosition.current.y - 8,
    };

    const move = {
      x: initialElementTransform.current.x + gap.x,
      y: initialElementTransform.current.y + gap.y,
    };

    element.style.transform = `translate3d(${move.x}px, ${move.y}px, 0px) scale(1.1)`;

    // down-up : 3
    let y = Math.round(gap.y / 120);
    if (Math.abs(y) > 0.5) {
      y = y * 3;
    }
    const x = Math.round(gap.x / 120);
    if (y + x === 0) {
      return;
    }
    let z = Math.round(y + x + draggingIndex.current);

    console.log(z);

    if (z < 0 || z > apps.length) {
      return;
    }

    const newOrder = [...order.current];
    if (z < 0) {
      z = order.current.indexOf(draggingIndex.current);
    } else {
      newOrder.splice(newOrder.indexOf(draggingIndex.current), 1);
      newOrder.splice(z, 0, draggingIndex.current);
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
  }, []);

  const funcUp = React.useCallback(() => {
    const element = document.querySelector("#fake-div") as HTMLDivElement;

    element!.style.transform = "";
    element!.style.left = "-1000px";
    element!.style.top = "-1000px";
    element!.style.opacity = "0";
    element!.style.zIndex = "";
    setCurrent(-1);

    window!.removeEventListener("mousemove", func);
    window!.removeEventListener("mouseup", funcUp);
  }, []);

  return (
    <Stack fullHeight flexDirection="column" paddingX={16}>
      <UserInfo>
        <Text variant="medium" weight="bold">
          {user}
        </Text>
      </UserInfo>
      <AppWrapper ref={wrapperRef}>
        <AppBlock
          id="fake-div"
          style={{
            width: 120,
            height: 120,
            opacity: 0,
            left: -1000,
            top: -1000,
          }}
          name={apps[0].name}
          icon={apps[0].name}
        />
        {springs.map((props, i) => {
          const dragId = apps[i].name;
          dragId;
          return (
            <AnimatedWrapper
              key={apps[i].name}
              style={props}
              onMouseDown={(event) => {
                draggingIndex.current = i;
                // handleMouseDown(event, dragId);
                const element = document.querySelector(
                  "#fake-div"
                ) as HTMLDivElement;
                window!.addEventListener("mousemove", func);
                window!.addEventListener("mouseup", funcUp);
                element!.style.transform = event.currentTarget.style.transform;
                element!.style.left = "";
                element!.style.top = "";
                element!.style.opacity = "1";
                element!.style.zIndex = "1";
                startPosition.current = {
                  x: event.clientX,
                  y: event.clientY,
                };
                const x = event.currentTarget.style.transform;
                setCurrent(i);
                const positions = x
                  .substring(12, 27)
                  .split(",")
                  .map((x) => x.replace("px", ""))
                  .map((x) => x.trim())
                  .map((x) => parseInt(x, 10));
                initialElementTransform.current = {
                  x: positions[0],
                  y: positions[1],
                };
                fakeStart;
                handleMouseDown;
              }}
            >
              <AppBlock
                isCurrent={current === i}
                style={{
                  width: 120,
                  height: 120,
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
