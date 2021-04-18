import DesktopIcon from "atoms/icons/image";
import { IAppGroup } from "base/interfaces";
import * as React from "react";
import styled from "styled-components";
import { Acrylic, Stack, Image, StackItem } from "atoms/styled";
import { Icon } from "@fluentui/react";
import useDate from "utils/hooks/useDate";

const Wrapper = styled(Acrylic)`
  display: flex;
  width: 100%;
  height: 52px;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
`;

const Absolute = styled.div<{ right?: boolean }>`
  position: absolute;
  height: 100%;
  ${({ right }) => (right ? "right: 0;" : "left: 0;")}
  top: 0;
`;

interface IProps {
  apps: Record<string, IAppGroup>;
}

const AppBar = ({ apps }: IProps) => {
  const sortedApps = Object.values(apps).sort((a, b) =>
    a.initialWeight > b.initialWeight ? 1 : -1
  );
  const date = useDate("hh:mm A");

  return (
    <Wrapper data-id="app-bar">
      <Stack fullWidth justifyContent="center" style={{ position: "relative" }}>
        <Absolute>
          <Stack alignItems="center" gap={16} fullHeight paddingLeft={16}>
            <DesktopIcon name="windows" size={32} />
          </Stack>
        </Absolute>
        <div>
          {sortedApps.map((app, i) => (
            <StackItem key={i}>
              <DesktopIcon size={48} name={app.id} />
            </StackItem>
          ))}
        </div>
        <Absolute right>
          <Stack alignItems="center" gap={16} fullHeight paddingRight={16}>
            <StackItem>
              <Icon style={{ fontWeight: "bold" }} iconName="ChevronUp" />
            </StackItem>
            <StackItem>
              <Image
                height={12}
                src={require("assests/images/battery.svg").default}
              />
            </StackItem>
            <StackItem>
              <Icon style={{ fontWeight: "bold" }} iconName="CannedChat" />
            </StackItem>
            <StackItem>{date}</StackItem>
          </Stack>
        </Absolute>
      </Stack>
    </Wrapper>
  );
};

export default AppBar;
