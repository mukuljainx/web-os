import * as React from "react";
import styled from "styled-components";
import { groupBy } from "lodash-es";

import { Stack, StackItem } from "atoms/styled";
import Text from "atoms/styled/text";
import Image, { availableIcons } from "atoms/styled/appImage";

interface IProps {}

const ListStack = styled(Stack)`
  overflow: auto;
  height: 100%;
`;

export const fakeList = () => {
  const apps = Object.keys(availableIcons)
    .map((k) => ({
      name: k,
      icon: availableIcons[k],
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const grouped = groupBy(apps, (x) => x.name[0].toLowerCase());
  return Object.keys(grouped)
    .map((k) => ({ group: k, apps: grouped[k] }))
    .sort((a, b) => (a.group > b.group ? 1 : -1));
};

const AppList = ({}: IProps) => {
  const appsGroups = React.useMemo(() => fakeList(), []);

  return (
    <ListStack flexDirection="column" gap={16}>
      <StackItem>
        <Text variant="medium" weight="bold">
          Recent Apps
        </Text>
      </StackItem>
      {appsGroups.map((group) => (
        <StackItem key={group.group}>
          <Text variant="medium" weight="bold" textTransform="capitalize">
            {group.group}
          </Text>

          <Stack flexDirection="column" gap={16} marginTop={16}>
            {group.apps.map((app, i) => (
              <StackItem key={group.group + i}>
                <Stack alignItems="center" gap={16}>
                  <Image
                    style={{ marginRight: 12 }}
                    name={app.name}
                    size={32}
                  />
                  <Text variant="medium" textTransform="capitalize">
                    {app.name}
                  </Text>
                </Stack>
              </StackItem>
            ))}
          </Stack>
        </StackItem>
      ))}
    </ListStack>
  );
};

export default AppList;
