import * as React from "react";
import styled from "styled-components";
import { shallowEqual, useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";

import { Acrylic, Stack, StackItem } from "atoms/styled";
import QuickAction from "./quickAction";
import AppList from "./appList";
import QuickPick from "./quickPick";

const Partial = styled(StackItem)``;

const Wrapper = styled(animated.div)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};

  height: 600px;
  /* bottom: -1052px; */
  border-top-right-radius: 4px;

  ${Acrylic} {
    height: 100%;
  }

  ${Partial} {
    padding-top: 32px;
    height: 100%;
  }

  ${Partial}:nth-child(1) {
    width: 64px;
  }

  ${Partial}:nth-child(2) {
    width: 272px;
  }

  ${Partial}:last-child {
    width: ${120 * 4 + 32 + 24}px;
  }

  ${Partial}:not(:last-child) {
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.acrylic};
  }
`;

interface IProps {}

const Menu = ({}: IProps) => {
  const menuProps = useSelector((state) => state.base.menu, shallowEqual);

  const transition = useTransition(menuProps.show, {
    from: {
      opacity: 0.5,
      bottom: -652,
    },
    leave: {
      opacity: 0.5,
      bottom: -652,
    },
    enter: {
      opacity: 1,
      bottom: 52,
    },
  });

  return transition(
    (style, item) =>
      item && (
        <Wrapper style={style} data-id="menu">
          <Acrylic>
            <Stack fullHeight>
              <Partial flexShrink={0}>
                <QuickAction />
              </Partial>
              <Partial>
                <AppList />
              </Partial>
              <Partial flexGrow={2}>
                <QuickPick />
              </Partial>
            </Stack>
          </Acrylic>
        </Wrapper>
      )
  );
};

export default React.memo(Menu);
