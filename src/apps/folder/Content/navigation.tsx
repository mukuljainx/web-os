import * as React from "react";
import { Breadcrumb } from "@fluentui/react";

import { Stack, StackItem, Icon } from "atoms/styled";

interface IProps {}

Breadcrumb;
const items = [
  { text: "Files", key: "Files", onClick: console.log },
  { text: "Folder 1", key: "f1", onClick: console.log },
  { text: "Folder 2", key: "f2", onClick: console.log },
  { text: "Folder 3", key: "f3", onClick: console.log },
  { text: "Folder 4 (non-clickable)", key: "f4" },
  { text: "Folder 5", key: "f5", onClick: console.log },
  { text: "Folder 6", key: "f6", onClick: console.log },
  { text: "Folder 7", key: "f7", onClick: console.log },
  { text: "Folder 8", key: "f8", onClick: console.log },
  { text: "Folder 9", key: "f9", onClick: console.log },
  { text: "Folder 10", key: "f10", onClick: console.log },
  {
    text: "Folder 11",
    key: "f11",
    onClick: console.log,
    isCurrentItem: true,
  },
];
items;

const Navigation = ({}: IProps) => {
  return (
    <Stack gap={24} paddingX={24} paddingY={16} alignItems="center">
      <StackItem>
        <Icon
          size={14}
          style={{ transform: "rotate(-45deg)" }}
          iconName="ArrowUpRightMirrored8"
        />
      </StackItem>
      <StackItem>
        <Icon
          size={14}
          style={{ transform: "rotate(135deg)" }}
          iconName="ArrowUpRightMirrored8"
        />
      </StackItem>
      <StackItem>
        <Icon
          size={14}
          style={{ transform: "rotate(45deg)" }}
          iconName="ArrowUpRightMirrored8"
        />
      </StackItem>
      <StackItem>
        <div>{/* <Breadcrumb items={items} /> */}</div>
      </StackItem>
    </Stack>
  );
};

export default Navigation;
