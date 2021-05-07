import * as React from "react";
import styled from "styled-components";
import { ActionButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { useTransition, animated, useSpring } from "react-spring";

import { Acrylic, Stack, Text, Icon } from "atoms/styled";
import Notification from "./notification";
import { INotification } from "../interface";

const Wrapper = styled.div`
  max-height: 132px;
  overflow: auto;
`;

interface IProps {
  hideNotifications: () => void;
  items: INotification[];
}

const Notifications = ({ hideNotifications, items }: IProps) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(true);
  const [notifications, setNotifications] = React.useState(items);

  const clearAll = () => {
    setNotifications([]);
  };

  const clear = React.useCallback(
    (id: number) => {
      setNotifications((n) => n.filter((x) => x.id !== id));
    },
    [setNotifications]
  );

  const expandStyles = useSpring({
    maxHeight: expanded ? 172 : 0,
    overflow: expanded ? "auto" : "hidden",
  });

  const transitions = useTransition(notifications, {
    from: {
      heigth: 64,
      marginBottom: 2,
    },
    enter: {
      heigth: 64,
      marginBottom: 2,
    },
    leave: {
      heigth: 0,
      marginBottom: 0,
    },
    onRest: () => {
      if (notifications.length === 0) {
        hideNotifications();
      }
    },
  });

  return (
    <Acrylic smooth style={{ marginTop: 16 }}>
      <Acrylic smooth>
        <Stack
          paddingX={16}
          paddingY={12}
          justifyContent="space-between"
          alignItems="center"
          onClick={toggleExpanded}
          style={{ cursor: "pointer" }}
        >
          <Text variant="smallPlus" weight={700}>
            Notificaitons
          </Text>
          <Icon
            cursor="pointer"
            iconName={expanded ? "ChevronUpSmall" : "ChevronDownSmall"}
            size={10}
          />
        </Stack>
      </Acrylic>
      <animated.div data-id="lol" style={expandStyles}>
        <Wrapper data-id="wrapper">
          {transitions((style, n) => (
            <animated.div
              style={{ height: style.heigth, marginBottom: style.marginBottom }}
            >
              <Notification item={n} onClear={clear} />
            </animated.div>
          ))}
        </Wrapper>
        <Stack justifyContent="center">
          <ActionButton onClick={clearAll}>Clear All</ActionButton>
        </Stack>
      </animated.div>
    </Acrylic>
  );
};

export default Notifications;
