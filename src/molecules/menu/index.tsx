import { Stack, StackItem } from "atoms/styled";
import * as React from "react";
import { IContextualMenuProps, CommandButton } from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";
import styled from "styled-components";

const MenuWrapper = styled(StackItem)`
  i {
    display: none;
  }
`;

interface IProps {
  items: Array<{ label: string }>;
}

const Menu = ({ items }: IProps) => {
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true,
    items: [
      {
        key: "rename",
        text: "Rename",
        onClick: () => console.log("Rename clicked"),
      },
      {
        key: "edit",
        text: "Edit",
        onClick: () => console.log("Edit clicked"),
      },
      {
        key: "properties",
        text: "Properties",
        onClick: () => console.log("Properties clicked"),
      },
      {
        key: "linkNoTarget",
        text: "Link same window",
        href: "http://bing.com",
      },
      {
        key: "linkWithTarget",
        text: "Link new window",
        href: "http://bing.com",
        target: "_blank",
      },
      { key: "disabled", text: "Disabled item", disabled: true },
    ],
  }));

  return (
    <Stack fullWidth gap={24} paddingX={16} paddingTop={8}>
      {items.map((item, i) => (
        <MenuWrapper key={i}>
          <CommandButton text={item.label} persistMenu menuProps={menuProps} />
        </MenuWrapper>
      ))}
    </Stack>
  );
};

export default Menu;
