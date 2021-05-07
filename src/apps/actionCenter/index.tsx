import * as React from "react";
import styled from "styled-components";
import { useBoolean } from "@fluentui/react-hooks";
import { useTransition, animated } from "react-spring";
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
  const actionCenterProps = useSelector(
    (state) => state.actionCenter,
    shallowEqual
  );
  const [showNotification, { setFalse }] = useBoolean(
    actionCenterProps.notifications.length > 0
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

  const transition = useTransition(actionCenterProps.show, {
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

  if (!actionCenterProps.show) {
    return null;
  }

  return transition(
    (style, item) =>
      item && (
        <Wrapper style={style}>
          {notificationTranstion(
            (notificationStyle, notificationItem) =>
              notificationItem && (
                <animated.div style={notificationStyle}>
                  <Notifications
                    items={actionCenterProps.notifications}
                    hideNotifications={setFalse}
                  />
                </animated.div>
              )
          )}
          <QuickSettings />
        </Wrapper>
      )
  );
};

export default React.memo(ActionCenter);
