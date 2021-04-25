import * as React from "react";
import styled from "styled-components";

import { Stack, Text, Icon } from "atoms/styled";
import { StackItem } from "@fluentui/react";

const Wrapper = styled(Stack)`
  height: 40px;
  flex-grow: 0;
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

type IProps = ReactHTMLElement<
  "div",
  {
    onCloseClick: () => void;
    name: string;
  }
>;

const TopBar = ({ name, onCloseClick, ref: __, ...rest }: IProps) => {
  return (
    <Wrapper
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
      <StackItem>
        <Icon
          onClick={onCloseClick}
          size={12}
          iconName="ChromeClose"
          cursor="pointer"
        />
      </StackItem>
    </Wrapper>
  );
};

export default TopBar;
