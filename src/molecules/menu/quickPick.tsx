import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Stack, Text } from "atoms/styled";
import AppBlock from "./appBlock";
import { fakeList } from "./appList";
import useDraggable from "utils/hooks/useDraggable";

const UserInfo = styled.div`
  margin-bottom: 32px;
  text-align: center;
  flex-shrink: 0;
`;

const AppWrapper = styled(Stack)`
  flex-grow: 2;
  overflow: auto;
  flex-wrap: wrap;
`;

interface IProps {}

let appsZ: Array<{ name: string; icon: string }> = [];
const fakeApps = fakeList();
fakeApps.forEach((a) => {
  appsZ = [...appsZ, ...a.apps];
});

const QucikPick = ({}: IProps) => {
  const [apps, setApps] = React.useState(appsZ);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const user = useSelector((state) => state.auth.user?.name);
  const startPosition = React.useRef({ x: 0, y: 0 });
  const dragging = React.useRef(-1);

  const onDragStart = React.useCallback((event: React.MouseEvent) => {
    startPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);
  const onDragEnd = React.useCallback((event: React.MouseEvent) => {
    const gap = {
      x: event.clientX - startPosition.current.x - 8,
      y: event.clientY - startPosition.current.y - 8,
    };
    // down-up : 3
    let y = Math.round(gap.y / 120);
    if (Math.abs(y) > 0.5) {
      y = y * 3;
    }
    const x = Math.round(gap.x / 120);

    const z = y + x + dragging.current;

    console.log(gap, z);

    if (z < 0 || z > apps.length) {
      clearStore();
      return;
    }

    setApps((items) => {
      const index = Math.round(z);
      const newItems = items.filter((__, j) => j !== dragging.current);
      newItems.splice(index, 0, items[dragging.current]);
      return [...newItems];
    });
  }, []);

  const { store, handleMouseDown, clearStore } = useDraggable({
    wrapperRef,
    single: true,
    onDragStart,
    onDragEnd,
  });

  React.useEffect(() => {
    console.log("sss");
    clearStore();
  }, [apps]);

  return (
    <Stack fullHeight flexDirection="column" paddingX={16}>
      <UserInfo>
        <Text variant="medium" weight="bold">
          {user}
        </Text>
      </UserInfo>
      <AppWrapper ref={wrapperRef}>
        {apps.map((app, i) => {
          const dragId = app.name;
          return (
            <AppBlock
              key={app.name}
              onMouseDown={(event) => {
                dragging.current = i;
                handleMouseDown(event, dragId);
              }}
              style={{
                width: 120,
                height: 120,
                transform: store.elements[dragId]
                  ? `translate(${store.elements[dragId]?.translate.x}px, ${store.elements[dragId]?.translate.y}px)`
                  : ``,
              }}
              name={app.name}
              icon={app.name}
            ></AppBlock>
          );
        })}
      </AppWrapper>
    </Stack>
  );
};

export default QucikPick;
