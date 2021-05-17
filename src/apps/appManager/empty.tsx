import * as React from "react";

import { Stack, StackItem, Text } from "atoms/styled";
import { PrimaryButton } from "@fluentui/react";

interface IProps {
  changeView: () => void;
}

const Empty = ({ changeView }: IProps) => {
  return (
    <Stack
      flexDirection="column"
      gap={16}
      alignItems="center"
      justifyContent="center"
      fullHeight
      style={{ textAlign: "center" }}
    >
      <StackItem>
        <Text variant="medium" weight="bold">
          No apps found.
        </Text>
      </StackItem>
      <StackItem>
        <PrimaryButton onClick={changeView}>Upload App</PrimaryButton>
      </StackItem>
    </Stack>
  );
};

export default Empty;
