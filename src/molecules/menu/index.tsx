import { Stack, StackItem, Text } from "atoms/styled";
import * as React from "react";

interface IProps {
  items: Array<{ label: string }>;
}

const Menu = ({ items }: IProps) => {
  return (
    <Stack fullWidth gap={16} paddingX={16} paddingTop={8}>
      {items.map((item, i) => (
        <StackItem key={i}>
          <Text>{item.label}</Text>
        </StackItem>
      ))}
    </Stack>
  );
};

export default Menu;
