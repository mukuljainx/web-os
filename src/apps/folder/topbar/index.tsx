import * as React from "react";
import styled from "styled-components";

import { Stack, Text, Icon } from "atoms/styled";
import { StackItem } from "@fluentui/react";

const WrapperStack = styled(Stack)`
  height: 40px;
  flex-grow: 0;
  position: relative;
`;

const TabHeader = styled(StackItem)`
  background: ${({ theme }) => theme.colors.plain};
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 12px;
  width: 160px;
  border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
`;

const ActionWrapper = styled(Stack)`
  position: absolute;
  height: 100%;
  right: 16px;
`;

type IProps = ReactHTMLElement<
  "div",
  {
    onCloseClick: () => void;
    name: string;
  }
>;

const TopBar = ({ name, onCloseClick, ref: __, ...rest }: IProps) => {
  return (
    <WrapperStack
      paddingRight={12}
      {...rest}
      alignItems="center"
      justifyContent="space-between"
      fullHeight
    >
      <TabHeader>
        <Text weight={600} variant="mediumPlus">
          {name}
        </Text>
      </TabHeader>
      <ActionWrapper alignItems="center">
        <Icon
          onClick={onCloseClick}
          size={12}
          iconName="ChromeClose"
          cursor="pointer"
        />
      </ActionWrapper>
    </WrapperStack>
  );
};

export default TopBar;
