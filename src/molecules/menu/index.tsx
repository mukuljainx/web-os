import { Stack, StackItem } from "atoms/styled";
import * as React from "react";
import { IContextualMenuProps, CommandButton } from "@fluentui/react";
// import { useConst } from "@fluentui/react-hooks";
import styled from "styled-components";

const MenuWrapper = styled(StackItem)`
  i {
    display: none;
  }
`;

interface IProps {
  items: Array<{
    label: string;
    options: IContextualMenuProps["items"];
  }>;
}

const Menu = ({ items }: IProps) => {
  const menuProps = items.map((item) => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: false,
    items: item.options,
  }));

  return (
    <Stack fullWidth gap={24} paddingX={16} paddingTop={8}>
      {items.map((item, i) => (
        <MenuWrapper key={i}>
          <CommandButton
            text={item.label}
            persistMenu
            menuProps={menuProps[i]}
          />
        </MenuWrapper>
      ))}
    </Stack>
  );
};

export default Menu;
