import * as React from "react";
import { useBoolean } from "@fluentui/react-hooks";
import { animated, useSpring } from "react-spring";

import { Acrylic, Stack, Text, Slider, Icon, StackItem } from "atoms/styled";
import Button, { ButtonType } from "./button";

interface IProps {}

const items: Array<{
  type?: ButtonType;
  label: string;
  icon: string;
  id: string;
}> = [
  {
    type: "WITH_OPTIONS",
    label: "WiFi",
    icon: "wifi",
    id: "wifi",
  },
  {
    type: "WITH_OPTIONS",
    label: "Bluetooth",
    icon: "bluetooth",
    id: "bluetooth",
  },
  {
    type: "NESTED",
    label: "Not Connected",
    icon: "TVMonitor",
    id: "external-monitor",
  },
  {
    id: "theme",
    type: "NESTED",
    label: "Light Mode",
    icon: "Lightbulb",
  },
  {
    id: "tablet-mode",
    label: "Tablet mode",
    icon: "TabletMode",
  },
  {
    id: "dnd",
    label: "Do not distrub",
    icon: "Blocked2",
  },
  {
    id: "airplane",
    label: "Airplane",
    icon: "Airplane",
  },
  {
    id: "location",
    label: "Location",
    icon: "MapPin",
  },
  {
    id: "ease-of-access",
    label: "Ease of Access",
    icon: "EaseOfAccess",
    type: "NESTED",
  },
];

const QuickSettings = ({}: IProps) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(true);

  const expandStyles = useSpring({
    height: expanded ? 325 : 0,
    overflow: expanded ? "auto" : "hidden",
  });

  return (
    <Acrylic smooth style={{ marginTop: 16 }}>
      <Acrylic smooth>
        <Stack
          paddingX={16}
          paddingY={12}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="smallPlus" weight={700}>
            Quick Settings
          </Text>
          <Icon
            cursor="pointer"
            onClick={toggleExpanded}
            iconName={expanded ? "ChevronUpSmall" : "ChevronDownSmall"}
            size={10}
          />
        </Stack>
      </Acrylic>
      <animated.div style={expandStyles}>
        <Stack paddingLeft={16} marginTop={16} flexWrap="wrap">
          {items.map((item) => (
            <Button {...item}></Button>
          ))}
        </Stack>
        <Stack paddingX={16} paddingY={8} fullWidth alignItems="center">
          <StackItem>
            <Icon iconName="Lightbulb" />
          </StackItem>
          <StackItem flexGrow={2}>
            <Slider min={1} max={100} defaultValue={40} showValue={false} />
          </StackItem>
        </Stack>
        <Stack
          paddingX={16}
          paddingY={8}
          paddingBottom={16}
          fullWidth
          alignItems="center"
        >
          <StackItem>
            <Icon iconName="Volume3" />
          </StackItem>
          <StackItem flexGrow={2}>
            <Slider min={1} max={100} defaultValue={40} showValue={false} />
          </StackItem>
        </Stack>
      </animated.div>
    </Acrylic>
  );
};

export default QuickSettings;
