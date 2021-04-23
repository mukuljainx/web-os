import { useTransition, animated, config } from "react-spring";
import * as React from "react";
import styled from "styled-components";
import { Icon } from "@fluentui/react";

import { Acrylic, Stack, Text } from "atoms/styled";
import { MenuItemsType } from "./interface";

const AnimatedWrapper = styled(animated.div)`
  z-index: ${({ theme }) => theme.zIndex.contextMenu};
  position: absolute;
  overflow: auto;
`;

const ItemWrapper = styled(Stack)<{ disabled?: boolean }>`
  &:hover {
    background: ${({ theme }) => theme.colors.plainHover};
  }
  ${({ disabled }) => disabled && `opacity: 0.3; pointer-events: none; `}
`;

const ItemGroupWrapper = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.plainHover};
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
    items: MenuItemsType[];
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
  items: itemGroup,
  show,
  itemAction,
  style,
  ref,
  ...rest
}: IProps) => {
  const menuLenght = React.useMemo(() => {
    let len = 0;
    itemGroup.forEach((x) => (len += x.length));

    return len;
  }, [itemGroup]);

  const transition = useTransition(show, {
    from: { height: 0 },
    enter: { height: menuLenght * 42 + itemGroup.length },
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
            {itemGroup.map((group, i) => (
              <ItemGroupWrapper key={i}>
                {group.map((item, j) => (
                  <ItemWrapper
                    disabled={item.disabled}
                    data-id="context-menu-item"
                    paddingX={8}
                    paddingY={12}
                    alignItems="center"
                    key={`${j}-${j}`}
                    data-row={i}
                    data-col={j}
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
              </ItemGroupWrapper>
            ))}
          </Wrapper>
        </AnimatedWrapper>
      )
  );
};

export default ContextMenu;
