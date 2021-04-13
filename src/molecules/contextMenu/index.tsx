import { useTransition } from "@react-spring/core";
import { animated } from "@react-spring/web";
import * as React from "react";
import styled from "styled-components";

const AnimatedWrapper = styled(animated.div)`
  z-index: ${({ theme }) => theme.zIndex.contextMenu};
  position: absolute;
  overflow: auto;
`;

const ItemWrapper = styled.div`
  padding: 12px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background: ${({ theme }) => theme.colors.plainHover};
  }
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.plain};
  width: 200px;
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
`;

interface IProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  items: Array<{
    label: string;
    action: (label: string, id: string) => void;
    id: string;
  }>;
}

const ContextMenu = ({ wrapperRef, items }: IProps) => {
  const [state, setState] = React.useState<{
    style: React.CSSProperties;
    show: boolean;
  }>({ show: false, style: {} });

  const handleContextMenuClick = React.useCallback((event: MouseEvent) => {
    event.preventDefault();
    setState({
      style: { left: event.clientX, top: event.clientY },
      show: true,
    });
  }, []);

  const hideMenu = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      show: false,
    }));
  }, []);

  const handleItemClick = React.useCallback((event: React.MouseEvent) => {
    const i = parseInt(event.currentTarget.getAttribute("data-index")!, 10);
    items[i].action(items[i].label, items[i].id);
  }, []);

  React.useEffect(() => {
    wrapperRef.current?.addEventListener("contextmenu", handleContextMenuClick);
    wrapperRef.current?.addEventListener("mousedown", hideMenu);
    return () => {
      wrapperRef.current?.removeEventListener(
        "mousedown",
        handleContextMenuClick
      );
      wrapperRef.current?.removeEventListener("contextmenu", hideMenu);
    };
  }, [wrapperRef]);

  const transition = useTransition(state.show, {
    from: { height: 0 },
    enter: { height: items.length * 42 },
    leave: { height: 0 },
  });

  return transition(
    (style, item, __, index) =>
      item && (
        <AnimatedWrapper key={index} style={{ ...style, ...state.style }}>
          <Wrapper>
            {items.map((item, j) => (
              <ItemWrapper key={j} data-index={j} onClick={handleItemClick}>
                {item.label}
              </ItemWrapper>
            ))}
          </Wrapper>
        </AnimatedWrapper>
      )
  );
};

export default ContextMenu;
