import * as React from "react";
import styled from "styled-components";

import { Stack, Icon, Text, Image } from "atoms/styled";
import { IButtonAction } from "../interface";

const ButtonWrapper = styled.button<{ selected?: boolean }>`
  background: ${({ theme }) => theme.colors.plain};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 91px;
  border: none;
  padding: 10px 6px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ selected, theme }) =>
    selected &&
    `background: ${theme.colors.blue} !important;
    color: ${theme.colors.plain} !important;`}
`;

interface IProps extends IButtonAction {
  toggleButton: (index: number, id: string) => void;
  index: number;
}

const Button = ({
  type,
  label,
  icon,
  selected,
  toggleButton,
  index,
  id,
}: IProps) => {
  switch (type) {
    case "NESTED": {
      return (
        <Stack
          marginRight={10}
          marginBottom={16}
          flexDirection="column"
          alignItems="center"
        >
          <ButtonWrapper
            selected={selected}
            onClick={() => {
              toggleButton(index, id);
            }}
          >
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
          <ButtonWrapper
            selected={selected}
            onClick={() => {
              toggleButton(index, id);
            }}
          >
            <Image
              height={16}
              src={
                require(`../assests/${icon}-${
                  !selected ? "black" : "white"
                }.png`).default
              }
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
          <ButtonWrapper
            selected={selected}
            onClick={() => {
              toggleButton(index, id);
            }}
          >
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
