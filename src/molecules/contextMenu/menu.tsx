import { useTransition, animated, config } from "react-spring";
import * as React from "react";
import styled from "styled-components";
import { Icon } from "@fluentui/react";

import { Acrylic, Stack, Text } from "atoms/styled";
import { IMenuItem } from "./interface";

const AnimatedWrapper = styled(animated.div)`
  z-index: ${({ theme }) => theme.zIndex.contextMenu};
  position: absolute;
  overflow: auto;
`;

const ItemWrapper = styled(Stack)`
  &:hover {
    background: ${({ theme }) => theme.colors.plainHover};
  }
`;

const Wrapper = styled(Acrylic)`
  width: 240px;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  ${ItemWrapper} {
    ${({ theme }) => `
    &:first-child {
      border-top-left-radius: ${theme.borderRadius}px;
      border-top-right-radius: ${theme.borderRadius}px;
    }
    &:last-child {
      border-bottom-left-radius: ${theme.borderRadius}px;
      border-bottom-right-radius: ${theme.borderRadius}px;
    }`}
  }

  i,
  span {
    width: 24px;
  }
`;

type IProps = ReactHTMLElement<
  "div",
  {
    items: Array<IMenuItem & { children?: IMenuItem[] }>;
    itemAction?: {
      onClick?: (event: React.MouseEvent) => void;
      onMouseEnter?: (event: React.MouseEvent) => void;
      onMouseLeave?: (event: React.MouseEvent) => void;
    };
    show: boolean;
    style: React.CSSProperties;
  }
>;

const ContextMenu = ({
  items,
  show,
  itemAction,
  style,
  ref,
  ...rest
}: IProps) => {
  const transition = useTransition(show, {
    from: { height: 0 },
    enter: { height: items.length * 42 },
    leave: { height: 0 },
    config: {
      ...config.default,
      duration: 150,
    },
  });

  return transition(
    (springStyle, item, __, index) =>
      item && (
        <AnimatedWrapper
          key={index}
          style={{
            ...springStyle,
            ...style,
          }}
          {...rest}
        >
          <Wrapper>
            {items.map((item, j) => (
              <ItemWrapper
                data-id="context-menu-item"
                paddingX={8}
                paddingY={12}
                alignItems="center"
                key={j}
                data-index={j}
                {...itemAction}
              >
                {item.icon ? <Icon iconName={item.icon} /> : <span></span>}
                <Text weight="light">{item.label}</Text>
                {item.icon ? (
                  <Icon iconName="ChevronRightMed" />
                ) : (
                  <span></span>
                )}
              </ItemWrapper>
            ))}
          </Wrapper>
        </AnimatedWrapper>
      )
  );
};

export default ContextMenu;
