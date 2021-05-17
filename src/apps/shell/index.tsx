import styled from "styled-components";
import * as React from "react";

import { Acrylic, Stack, Text, Icon, StackItem } from "atoms/styled";
import AppImage from "atoms/styled/appImage";

const Wrapper = styled(Acrylic)`
  width: 720px;
  height: 480px;
  min-width: 240px;
  min-height: 240px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  resize: both;
  overflow: auto;
`;

const TopBar = styled.div`
  height: 38px;
  padding: 0 16px;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

type IProps = ReactHTMLElement<
  "div",
  {
    icon: string;
    name: string;
    appName: string;
    instanceId: string;
    children: React.ReactChild;
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
    onMouseDown: (event: React.MouseEvent, dragId: string) => void;
    dragId: string;
  }
>;

const AppShell = ({
  icon,
  name,
  appName,
  instanceId,
  children,
  onMouseDown,
  ref,
  width,
  height,
  style,
  dragId,
  ...rest
}: IProps) => {
  const handleMouseDownDrag = React.useCallback(
    (event: React.MouseEvent) => {
      onMouseDown(event, dragId);
    },
    [onMouseDown, dragId]
  );

  return (
    <Wrapper
      {...rest}
      style={{ ...style, width, height }}
      data-id="app-shell-wrapper"
      onMouseDown={() => {
        window.os.bringToTop({ appName, instanceId });
      }}
    >
      <Stack fullWidth fullHeight flexDirection="column">
        <StackItem flexShrink={0} data-test="topbar">
          <TopBar data-id="app-shell-top-bar" onMouseDown={handleMouseDownDrag}>
            <Stack
              alignItems="center"
              justifyContent="space-between"
              fullHeight
            >
              <Stack alignItems="center">
                <AppImage height={24} name={icon} style={{ paddingRight: 8 }} />
                <Text weight={700} variant="mediumPlus">
                  {name}
                </Text>
              </Stack>
              <Stack>
                <Icon
                  onClick={() => window.os.closeApp({ appName, instanceId })}
                  size={12}
                  iconName="ChromeClose"
                  cursor="pointer"
                />
              </Stack>
            </Stack>
          </TopBar>
        </StackItem>
        <StackItem flexGrow={2} style={{ overflow: "hidden" }}>
          <Content
            onMouseDown={(e) => e.stopPropagation()}
            data-id="app-shell-content"
          >
            {children}
          </Content>
        </StackItem>
      </Stack>
    </Wrapper>
  );
};

export default AppShell;
