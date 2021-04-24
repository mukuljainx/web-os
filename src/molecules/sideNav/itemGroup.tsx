import { Stack } from "atoms/styled";
import * as React from "react";
import { INavItem } from "./interface";
import NavItem from "./navItem";
import Nested from "./nested";

interface IProps {
  name: string;
  icon: string;
  children?: INavItem[];
}

const ItemGroup = ({ name, icon, children }: IProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Stack flexDirection="column">
      <NavItem
        name={name}
        icon={icon}
        expanded={expanded}
        expandable={!!children}
        onExpandClick={() => setExpanded((e) => !e)}
      />
      <Stack flexDirection="column" marginLeft={16}>
        {children && <Nested expanded={expanded} items={children} />}
      </Stack>
    </Stack>
  );
};

export default ItemGroup;
