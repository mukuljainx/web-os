import { Stack } from "atoms/styled";
import * as React from "react";
import { INavItem } from "./interface";
import NavItem from "./navItem";
import Nested from "./nested";

interface IProps extends INavItem {
  children?: INavItem[];
}

const ItemGroup = ({ children, ...rest }: IProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Stack flexDirection="column">
      <NavItem
        {...rest}
        expanded={expanded}
        expandable={!!children}
        onExpandClick={(event) => {
          event.stopPropagation();
          setExpanded((e) => !e);
        }}
      />
      <Stack flexDirection="column" marginLeft={16}>
        {children && <Nested expanded={expanded} items={children} />}
      </Stack>
    </Stack>
  );
};

export default ItemGroup;
