import * as React from "react";
import styled from "styled-components";

import Notifications from "./notifications";
import QuickSettings from "./quickSettings";

const Wrapper = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};
  bottom: 64px;
  right: 16px;
  width: 320px;
`;

interface IProps {}

const ActionCenter = ({}: IProps) => {
  return (
    <Wrapper>
      <Notifications />
      <QuickSettings />
    </Wrapper>
  );
};

export default React.memo(ActionCenter);
