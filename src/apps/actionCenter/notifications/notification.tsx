import * as React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

import { Acrylic, Stack, Text } from "atoms/styled";

interface IProps {
  item: {
    title: string;
    desciption: string;
    date: number;
    id: number;
  };
  onClear: (id: number) => void;
}

const NotificationWrapper = styled(Acrylic)`
  background: white;
  .text-line-height {
    line-height: 1.4;
  }
  .notification-row1 {
    position: relative;
  }

  .close-icon {
    position: absolute;
    right: 4px;
    top: 4px;
  }

  .flex-shrink {
    flex-shrink: 0;
    width: auto !important;
  }
  .underline {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Notification = ({ onClear, item }: IProps) => {
  // const [state, setState] = React.useState(true);
  const transitions = useTransition(item, {
    from: {
      heigth: 64,
    },
    enter: {
      heigth: 64,
    },
    leave: {
      heigth: 0,
    },
    onRest: () => {
      console.log(onClear);
      // onClear(item.id);
    },
  });

  return transitions((style) => (
    <animated.div
      style={{
        ...style,
        marginBottom: 2,
      }}
    >
      <NotificationWrapper>
        <Stack
          fullWidth
          padding={16}
          flexDirection="column"
          className="notification-row1"
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text className="text-line-height" weight={600} variant="smallPlus">
              {item.title}
            </Text>
            <Text className="text-line-height flex-shrink" variant="smallPlus">
              {dayjs(item.date).format("hh:mm A")}
            </Text>
          </Stack>
          <Stack justifyContent="space-between" alignItems="center">
            <Text className="text-line-height" variant="smallPlus">
              {item.desciption}
            </Text>
            <Text
              onClick={() => {
                onClear(item.id);
                // setState(false);
              }}
              className="flex-shrink underline"
              variant="smallPlus"
            >
              Clear
            </Text>
          </Stack>
        </Stack>
      </NotificationWrapper>
    </animated.div>
  ));
};

export default React.memo(Notification);
