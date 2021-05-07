import * as React from "react";
import styled from "styled-components";

import { Stack, Icon, Text, Image } from "atoms/styled";

const ButtonWrapper = styled.button`
  background: ${({ theme }) => theme.colors.plain};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 91px;
  border: none;
  padding: 10px 6px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ButtonType = "NESTED" | "WITH_OPTIONS";

interface IProps {
  type?: "NESTED" | "WITH_OPTIONS";
  label: string;
  icon: string;
  id: string;
}

const Button = ({ type, label, icon }: IProps) => {
  switch (type) {
    case "NESTED": {
      return (
        <Stack
          marginRight={10}
          marginBottom={16}
          flexDirection="column"
          alignItems="center"
        >
          <ButtonWrapper>
            <Icon iconName={icon} />
          </ButtonWrapper>
          <Text variant="small" textAlign="center">
            {label}
          </Text>
        </Stack>
      );
    }
    case "WITH_OPTIONS": {
      return (
        <Stack
          marginRight={10}
          marginBottom={16}
          flexDirection="column"
          alignItems="center"
        >
          <ButtonWrapper>
            <Image
              height={16}
              src={require(`../assests/${icon}-dark.png`).default}
            />
          </ButtonWrapper>
          <Text variant="small" textAlign="center">
            {label}
          </Text>
        </Stack>
      );
    }
    default: {
      return (
        <Stack
          marginRight={10}
          marginBottom={16}
          flexDirection="column"
          alignItems="center"
        >
          <ButtonWrapper>
            <Icon iconName={icon} />
          </ButtonWrapper>
          <Text variant="small" textAlign="center">
            {label}
          </Text>
        </Stack>
      );
    }
  }
};

export default Button;
