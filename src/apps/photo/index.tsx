import * as React from "react";
import AppShell from "apps/shell";
import styled from "styled-components";

import { Image, Stack, Text } from "atoms/styled";
import useAnimationEndRender from "utils/hooks/useAnimationEndRender";

const Wrapper = styled(Stack)`
  background: ${({ theme }) => theme.colors.plain};
`;

interface IProps {
  path: string;
  instanceId: string;
  appName: string;
  onMouseDown: (event: React.MouseEvent) => void;
  dragId: string;
}

const Photo = ({ path, appName, instanceId, onMouseDown, dragId }: IProps) => {
  const { render } = useAnimationEndRender({ instanceId });

  return (
    <AppShell
      dragId={dragId}
      onMouseDown={onMouseDown}
      appName={appName}
      instanceId={instanceId}
      icon="photo"
      name="Photo"
    >
      <Wrapper fullHeight fullWidth alignItems="center" justifyContent="center">
        {render ? (
          <Image
            style={{ maxHeight: "100%" }}
            src={require(`apps/photo/assests/${path}`).default}
          />
        ) : (
          <Text textAlign="center">Loading Image...</Text>
        )}
      </Wrapper>
    </AppShell>
  );
};

export default React.memo(Photo);
