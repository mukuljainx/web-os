import * as React from "react";
import styled from "styled-components";
import { ActionButton } from "@fluentui/react";
import { useSprings, animated } from "react-spring";

import { Acrylic, Stack, Text, Icon } from "atoms/styled";
import { useEvent } from "utils/events";
import Notification from "./notification";

interface IProps {}

const Wrapper = styled.div`
  overflow: auto;
  position: relative;
`;

const AnimatedDiv = styled(animated.div)`
  position: absolute;
`;

const animate = (index: number) => {
  return { y: index * 64 + index * 2 };
};

const Notifications = ({}: IProps) => {
  const fakeNotification = [
    {
      title: "Budget Book",
      desciption: "Just got installed, check it out.",
      date: new Date().getTime(),
      id: 1,
    },
    {
      title: "Ping Pong",
      desciption: "Just got installed, check it out.",
      date: new Date().getTime() - 23134,
      id: 2,
    },
    {
      title: "Ping Pong",
      desciption: "Just got installed, check it out.",
      date: new Date().getTime() - 23134,
      id: 3,
    },
    {
      title: "Ping Pong",
      desciption: "Just got installed, check it out.",
      date: new Date().getTime() - 23134,
      id: 4,
    },
  ];

  const [notifications, setNotifications] = React.useState(fakeNotification);

  useEvent("ANIMATED_FOLDER_ANIMATION_COMPLETED", (e) => {
    setNotifications((n) => [...n, { ...e.detail.notification, id: n.length }]);
  });

  const clearAll = () => {
    setNotifications([]);
  };

  const clear = React.useCallback(
    (id: number) => {
      setNotifications((n) => n.filter((x) => x.id !== id));
    },
    [setNotifications]
  );

  const [springs, setSprings] = useSprings(notifications.length, animate);
  setSprings;

  console.log(notifications);

  return (
    <Acrylic smooth style={{ marginTop: 16 }}>
      <Acrylic smooth style={{ marginBottom: 8 }}>
        <Stack
          paddingX={16}
          paddingY={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="smallPlus" weight={700}>
            Notificaitons
          </Text>
          <Icon iconName="ChevronUpSmall" size={10} />
        </Stack>
      </Acrylic>
      <Wrapper data-id="wrapper">
        {springs.map((style, index) => {
          const n = notifications[index];
          return (
            <AnimatedDiv style={style} key={n.id}>
              <Notification item={n} onClear={clear} />
            </AnimatedDiv>
          );
        })}
      </Wrapper>
      <Stack justifyContent="center">
        <ActionButton onClick={clearAll}>Clear All</ActionButton>
      </Stack>
    </Acrylic>
  );
};

export default Notifications;
