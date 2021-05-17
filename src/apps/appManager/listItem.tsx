import * as React from "react";

import { Stack, StackItem, Text } from "atoms/styled";
import { IApp } from "./interface";
import { PrimaryButton, TextField } from "@fluentui/react";

interface IProps {
  app: IApp;
  goBack: (index: number) => void;
}

const ListItem = ({ app, goBack }: IProps) => {
  if (!app) {
    return null;
  }
  return (
    <Stack
      fullHeight
      flexDirection="column"
      alignItems="center"
      padding={32}
      gap={16}
    >
      <StackItem style={{ textAlign: "center", width: 320 }}>
        <Text variant="mediumPlus" as="h3" weight={600}>
          {app.name}
        </Text>
        <br />
        <Text>
          App details are limited and read only right now. App versions and edit
          mode will be available soon.
        </Text>
      </StackItem>
      <StackItem style={{ width: 480 }}>
        <TextField
          label="Options"
          rows={4}
          value={JSON.stringify(app.options, null, 4)}
          multiline
        />
      </StackItem>
      <StackItem>
        <PrimaryButton onClick={() => goBack(-1)}>Go Back</PrimaryButton>
      </StackItem>
    </Stack>
  );
};

export default ListItem;
