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
import { animate, getIndex, getPositionToIndexMapping } from "./utils";

export interface IAppList {
  name: string;
  icon: string;
  width: number;
  position: number;
}

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
  overflow-x: hidden;
`;

const AnimatedWrapper = styled(animated.div)`
  position: absolute;
  border-radius: 4px;
`;

interface IProps {}

// TODO: drive row redux menu config
const ROW_SIZE = 4;

const QucikPick = ({}: IProps) => {
  const getApps = React.useCallback(() => {
    let appsZ: IAppList[] = [];
    const fakeApps = fakeList();
    fakeApps.forEach((a) => {
      appsZ = [
        ...appsZ,
        ...a.apps.map((a) => ({
          ...a,
          width: 1,
          position: -1,
        })),
      ];
    });

    appsZ = appsZ.map((a) => ({ ...a, width: Math.random() > 0.5 ? 2 : 1 }));

    return getIndex(appsZ, ROW_SIZE);
  }, []);
  const apps = React.useMemo(getApps, []);
  const order = React.useRef(
    apps.map((a, index) => ({ index, width: a.width, position: a.position }))
  );
  const positionToIndexMap = React.useRef(
    getPositionToIndexMapping(order.current, ROW_SIZE)
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.auth.user?.name);
  const startPosition = React.useRef({ x: 0, y: 0 });
  const draggingIndex = React.useRef(-1);
  const [springs, setSprings] = useSprings(
    apps.length,
    animate(ROW_SIZE, order.current)
  );

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

    // draggingIndex.current will contain the current index, where index is intial
    // render index, which might differ in order array
    // so we need position of that element in order array
    const prevIndex = order.current.findIndex(
      (a) => draggingIndex.current === a.index
    );
    const currentElement = order.current[prevIndex];
    const oldPosition = currentElement.position;

    // down-up : 3
    let y = Math.round(gap.y / 120);
    if (Math.abs(y) > 0.5) {
      y = y * ROW_SIZE;
    }

    const x = Math.round(gap.x / 120);

    const z = y + x + oldPosition;
    // how much block has moved
    let newPosition = Math.round(z);
    const movement = newPosition - oldPosition > 0 ? "FORWARD" : "BACKWARD";

    let newOrder = [...order.current];

    const changeOrder = (
      prev: number,
      dirtyNewIndex: number,
      newPosition: number,
      width?: number
    ) => {
      let newI = dirtyNewIndex;
      newPosition;
      // only elements with width 1
      // are allowed to attached in empty spaces
      // reason being, allowing everything will
      // complicate process a lot, but ROI will be very low
      if (dirtyNewIndex === -1 && width === 1) {
        // search in the order where it fits as per the new position
        let i =
          newOrder.findIndex((a) => a.position > newPosition) +
          (movement === "BACKWARD" ? 0 : -1);

        if (i < 0) {
          i = order.current.length - 1;
        }

        const newElementProps = {
          ...newOrder[prev],
          position: newPosition,
        };
        newI = i;
        // remove it from previous index and insert to new index
        newOrder.splice(prev, 1);
        newOrder.splice(newI, 0, newElementProps);
        newOrder = getIndex(newOrder, ROW_SIZE);
      } else {
        // remove it from previous index and insert to new index
        newOrder.splice(prev, 1);
        newOrder.splice(newI, 0, { ...order.current[prev] });
        // get latest positions as per the width
        newOrder = getIndex(newOrder, ROW_SIZE);
      }
    };

    // if the element has some width, this will same as prevIndex
    let newIndex = positionToIndexMap.current[newPosition];

    if (newPosition < 0) {
      // do nothing
      newIndex = prevIndex;
    } else if (prevIndex !== newIndex) {
      // these are special checks in case of different width
      // check new element width
      // newIndex can't be used directly here
      const newPositionElement =
        order.current[positionToIndexMap.current[newPosition]];
      // if element exist and it has width more than 2
      // if it doesn't "empty space"
      // them move block freely in else case
      if (newPositionElement && newPositionElement.width > 1) {
        if (Math.abs(newPosition - oldPosition) < newPositionElement.width) {
          // do nothing
        } else {
          changeOrder(prevIndex, newIndex, newPosition, currentElement.width);
        }
      } else {
        changeOrder(prevIndex, newIndex, newPosition, currentElement.width);
      }
    }

    setSprings(
      animate(
        ROW_SIZE,
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
      positionToIndexMap.current = getPositionToIndexMapping(
        order.current,
        ROW_SIZE
      );
    }
  }, [store]);

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
                  width: 128 * apps[i].width - 8,
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
