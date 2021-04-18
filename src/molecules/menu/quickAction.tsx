import * as React from "react";
import { Icon } from "@fluentui/react";

import { Stack, StackItem } from "atoms/styled";

interface IProps {}

const QuickAction = ({}: IProps) => {
  return (
    <Stack
      flexDirection="column"
      justifyContent="space-between"
      fullHeight
      alignItems="center"
    >
      <div>
        <Icon iconName="CollapseMenu" />
      </div>
      <Stack flexDirection="column" gap={16} paddingBottom={16}>
        <StackItem as="span">
          <Icon iconName="PictureFill" />
        </StackItem>
        <StackItem as="span">
          <Icon iconName="Settings" />
        </StackItem>
        <StackItem as="span">
          <Icon iconName="AllApps" />
        </StackItem>
        <StackItem as="span">
          <Icon iconName="PowerButton" />
        </StackItem>
      </Stack>
    </Stack>
  );
};

export default QuickAction;
