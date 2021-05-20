import * as React from "react";
import AppShell from "apps/shell";
import styled from "styled-components";

import useAnimationEndRender from "utils/hooks/useAnimationEndRender";
import useScript from "utils/hooks/useScript";
import If from "atoms/If";
import Loader from "./loader";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  background: ${({ theme }) => theme.colors.plain};
`;

interface IProps {
  instanceId: string;
  appName: string;
  onMouseDown: (event: React.MouseEvent, dragId: string) => void;
  dragId: string;
  data: Record<string, any>;
}

const ExternalAppShell = ({
  appName,
  instanceId,
  onMouseDown,
  dragId,
  data,
}: IProps) => {
  const { render } = useAnimationEndRender({ instanceId });
  const status = useScript(
    `http://${process.env.API}/api/manager/assests/${data.appId}/main.js`,
    true
  );
  console.log(data.options);
  return (
    <AppShell
      height={data.options.height}
      width={data.options.width}
      dragId={dragId}
      onMouseDown={onMouseDown}
      appName={appName}
      instanceId={instanceId}
      icon={data.icon}
      name={data.name}
    >
      <If condition={render > 0}>
        <If condition={status !== "ready"}>
          <Loader status={status} />
        </If>
        {/* keep it always ready */}
        <Wrapper hidden={status !== "ready"} id={data.appId}></Wrapper>
      </If>
    </AppShell>
  );
};

export default React.memo(ExternalAppShell);
