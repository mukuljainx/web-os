import * as React from "react";
import styled from "styled-components";

import { Acrylic, Stack, StackItem } from "atoms/styled";
import QuickAction from "./quickAction";
import AppList from "./appList";
import QuickPick from "./quickPick";

const Partial = styled(StackItem)``;

const Wrapper = styled(Acrylic)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};

  height: 600px;
  bottom: 52px;
  border-top-right-radius: 4px;

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
    width: ${120 * 3 + 32 + 16}px;
  }

  ${Partial}:not(:last-child) {
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.acrylic};
  }
`;

interface IProps {}

const Menu = ({}: IProps) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default Menu;
