import * as React from "react";
import dayjs from "dayjs";

import { Image, Stack, StackItem, Text } from "atoms/styled";
import { IApp } from "./interface";
import styled from "styled-components";
import { PrimaryButton } from "@fluentui/react";

const ImageContainer = styled(StackItem)`
  background: rgba(${({ theme }) => theme.colors.blackRGB}, 0.1);
`;

const AppName = styled(StackItem)`
  margin-left: 8px;
`;

const Pill = styled(Stack)`
  background: rgb(${({ theme }) => theme.colors.blueRGB});
  border-radius: 100px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colors.plain} !important;
  }
`;

const ItemRow = styled(Stack)`
  padding: 16px;
  cursor: pointer;
  &:hover {
    background: rgba(${({ theme }) => theme.colors.blueRGB}, 0.1);
  }
`;

const ItemsWrapper = styled(StackItem)`
  overflow: auto;
  flex-grow: 2;
  max-height: 100%;
`;

interface IProps {
  items: IApp[];
  onItemClick: (index: number) => void;
  onAddAppClick: () => void;
}

const List = ({ items, onItemClick, onAddAppClick }: IProps) => {
  return (
    <Stack flexDirection="column" paddingY={16} fullHeight id="txx">
      <StackItem style={{ padding: "0 16px", marginBottom: 16 }}>
        <Stack justifyContent="space-between" alignItems="center">
          <StackItem>
            <Text variant="mediumPlus" weight={600}>
              Installed Apps
            </Text>
          </StackItem>
          <StackItem>
            <PrimaryButton onClick={onAddAppClick}>Add App</PrimaryButton>
          </StackItem>
        </Stack>
      </StackItem>
      <ItemsWrapper>
        <Stack id="txx" flexDirection="column">
          {items.map((app, index) => (
            <ItemRow
              key={index}
              onClick={() => onItemClick(index)}
              justifyContent="space-between"
              alignItems="center"
            >
              <StackItem>
                <Stack alignItems="center">
                  <ImageContainer>
                    <Image height={32} src={app.icon} />
                  </ImageContainer>
                  <AppName>
                    <Text weight={600} variant="mediumPlus">
                      {app.name}
                    </Text>
                    <br />
                    <Text>
                      Updated on: {dayjs(app.updatedAt).format("DD/MM/YYYY")}
                    </Text>
                  </AppName>
                </Stack>
              </StackItem>
              <Stack flexDirection="column" alignItems="flex-end" gap={4}>
                <StackItem>
                  <Pill as="span">
                    <Text variant="small">{app.type}</Text>
                  </Pill>
                </StackItem>
                <StackItem>
                  <Text>Added by: {app.user.name}</Text>
                </StackItem>
              </Stack>
            </ItemRow>
          ))}
        </Stack>
      </ItemsWrapper>
    </Stack>
  );
};

export default List;
