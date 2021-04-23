import * as React from "react";
import Menu from "./menu";

import useGlobal from "./useGlobal";
import useLocal from "./useLocal";

export interface IMenuItem {
  icon?: string;
  label: string;
  action?: (label: string, id: string) => void;
  id: string;
}

interface IProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  items: Array<IMenuItem & { children?: IMenuItem[] }>;
  childMenu?: {
    show: boolean;
    style: React.CSSProperties;
  };
}

const ContextMenu = ({ wrapperRef, items, childMenu }: IProps) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const state = useGlobal(wrapperRef, menuRef);
  const childState = useLocal();

  const handleItemClick = React.useCallback((event: React.MouseEvent) => {
    if (!childMenu) {
      childState.hideMenu();
    }
    const i = parseInt(event.currentTarget.getAttribute("data-index")!, 10);
    if (!items[i].action) {
      return;
    }
    items[i].action!(items[i].label, items[i].id);
    state.hideMenu();
  }, []);

  const handleItemMouseEnter = React.useCallback((event: React.MouseEvent) => {
    const element = event.currentTarget;
    const i = parseInt(element.getAttribute("data-index")!, 10);
    const childItems = items[i].children || [];

    if (childItems.length === 0) {
      childState.hideMenu();
      return;
    }
    childState.showMenu({
      items: childItems,
      left: element.getBoundingClientRect().right,
      top: element.getBoundingClientRect().top,
    });
  }, []);

  React.useEffect(() => {
    childState.hideMenu();
  }, [state.show]);

  return (
    <span ref={menuRef} onMouseLeave={childState.hideMenu}>
      <Menu
        test-id="context-menu"
        itemAction={{
          onClick: handleItemClick,
          onMouseEnter: handleItemMouseEnter,
        }}
        show={state.show}
        style={state.style}
        items={items}
      />
      <Menu
        test-id="child-context-menu"
        itemAction={{
          onClick: handleItemClick,
        }}
        show={childState.show}
        style={childState.style}
        items={childState.items}
      />
    </span>
  );
};

export default ContextMenu;
