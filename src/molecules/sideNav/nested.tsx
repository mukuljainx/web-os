import { useTransition, animated } from "react-spring";
import { Stack } from "atoms/styled";
import * as React from "react";
import { INavItem } from "./interface";
import NavItem from "./navItem";

interface IProps {
  items: INavItem[];
  expanded: boolean;
}

const Nested = ({ items, expanded }: IProps) => {
  const transition = useTransition(expanded, {
    from: { height: 0 },
    enter: { height: items.length * 39 },
    leave: { height: 0 },
  });

  return transition(
    (style, item) =>
      item && (
        <animated.div id="ttt" style={{ ...style, overflow: "auto" }}>
          <Stack flexDirection="column" marginLeft={16}>
            {items.map((item, i) => (
              <NavItem key={i} {...item} />
            ))}
          </Stack>
        </animated.div>
      )
  );
};

export default Nested;
