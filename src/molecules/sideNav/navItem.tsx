import Image from "atoms/styled/appImage";
import { Stack, StackItem, Text, Icon } from "atoms/styled";

import * as React from "react";
import { INavItem } from "./interface";

interface IProps extends INavItem {
  expandable?: boolean;
  expanded?: boolean;
  onExpandClick?: (event: React.MouseEvent) => void;
}

const NavItem = ({
  name,
  icon,
  id,
  action,
  expandable,
  expanded,
  onExpandClick,
}: IProps) => {
  return (
    <Stack
      justifyContent="space-between"
      marginTop={16}
      alignItems="center"
      onClick={(event) => {
        action(event, id);
      }}
    >
      <Stack alignItems="center" gap={8}>
        <StackItem>
          <Image name={icon} height={20} />
        </StackItem>
        <StackItem>
          <Text variant="mediumPlus">{name}</Text>
        </StackItem>
      </Stack>
      {expandable && (
        <StackItem>
          <Icon
            onClick={onExpandClick}
            iconName={expanded ? "ChevronDownMed" : "ChevronRightMed"}
            size={14}
          />
        </StackItem>
      )}
    </Stack>
  );
};

export default NavItem;
