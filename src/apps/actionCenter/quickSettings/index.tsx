import * as React from "react";
import { useBoolean } from "@fluentui/react-hooks";
import { animated, useSpring } from "react-spring";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Acrylic, Stack, Text, Slider, Icon, StackItem } from "atoms/styled";
import Button from "./button";
import { toggleButton, sliderOnChange } from "../store/index";

interface IProps {}

const QuickSettings = ({}: IProps) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(true);

  const state = useSelector((state) => state.actionCenter, shallowEqual);

  const dispatch = useDispatch();

  const toggleButtonHandler = React.useCallback(
    (index: number, id: string) => {
      dispatch(toggleButton({ index, id }));
    },
    [dispatch]
  );

  const handleSliderChange = React.useCallback(
    (value: number, target: any) => {
      dispatch(sliderOnChange({ value, target }));
    },
    [dispatch, sliderOnChange]
  );

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
          onClick={toggleExpanded}
          style={{ cursor: "pointer" }}
        >
          <Text variant="smallPlus" weight={700}>
            Quick Settings
          </Text>
          <Icon
            cursor="pointer"
            iconName={expanded ? "ChevronUpSmall" : "ChevronDownSmall"}
            size={10}
          />
        </Stack>
      </Acrylic>
      <animated.div style={expandStyles}>
        <Stack paddingLeft={16} marginTop={16} flexWrap="wrap">
          {state.buttonActions.map((item, index) => (
            <Button
              {...item}
              index={index}
              toggleButton={toggleButtonHandler}
              key={index}
            ></Button>
          ))}
        </Stack>
        <Stack paddingX={16} paddingY={8} fullWidth alignItems="center">
          <StackItem>
            <Icon iconName="Lightbulb" />
          </StackItem>
          <StackItem flexGrow={2}>
            <Slider
              min={1}
              max={100}
              value={state.slider.brigthness}
              onChange={(value) => {
                handleSliderChange(value, "brigthness");
              }}
              showValue={false}
            />
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
            <Slider
              value={state.slider.volume}
              min={1}
              max={100}
              onChange={(value) => {
                handleSliderChange(value, "volume");
              }}
              showValue={false}
            />
          </StackItem>
        </Stack>
      </animated.div>
    </Acrylic>
  );
};

export default QuickSettings;
