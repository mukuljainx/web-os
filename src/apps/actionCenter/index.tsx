import * as React from "react";
import styled from "styled-components";
import { useBoolean } from "@fluentui/react-hooks";
import { useTransition, animated, useTrail } from "react-spring";
import { shallowEqual, useSelector } from "react-redux";

import Notifications from "./notifications";
import QuickSettings from "./quickSettings";

const Wrapper = styled(animated.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};
  bottom: 64px;
  right: 16px;
  width: 320px;
`;

interface IProps {}

const ActionCenter = ({}: IProps) => {
  const quickActionProps = useSelector(
    (state) => state.base.quickActions,
    shallowEqual
  );
  const [showNotification, { setFalse }] = useBoolean(
    quickActionProps.notifications.length > 0
  );

  const notificationTranstion = useTransition(showNotification, {
    from: {
      x: 0,
    },
    enter: {
      x: 0,
    },
    leave: {
      x: 2000,
    },
    delay: 0,
  });

  const transition = useTrail(2, {
    from: {
      opacity: 0,
      y: 500,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 500,
    },
  });

  if (!quickActionProps.show) {
    return null;
  }

  return transition.map((style, index) => (
    <Wrapper style={style}>
      {notificationTranstion(
        (notificationStyle, notificationItem) =>
          notificationItem && (
            <animated.div style={notificationStyle}>
              <Notifications
                items={quickActionProps.notifications}
                hideNotifications={setFalse}
              />
            </animated.div>
          )
      )}
      <QuickSettings />
    </Wrapper>
  ));
};

export default React.memo(ActionCenter);
